const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/convert', async (req, res) => {
    const { apiType, apiKey, modelType, maxTokens, dbInfo, textQuery } = req.body;
    let apiUrl, requestData;

    // Parse dbInfo from JSON string to object
    const parsedDbInfo = JSON.parse(dbInfo);

    // Format database info for the AI prompt
    const formattedDbInfo = parsedDbInfo.map(table => 
        `Table: ${table.name}\nColumns: ${table.columns.map(col => `${col.name} (${col.type})`).join(', ')}`
    ).join('\n\n');

    if (apiType === 'openai') {
        apiUrl = 'https://api.openai.com/v1/chat/completions';
        requestData = {
            model: modelType,
            messages: [
                { role: "system", content: `You are a SQL expert. Convert the following text to a SQL query. Use the provided database information:\n\n${formattedDbInfo}` },
                { role: "user", content: textQuery }
            ],
            max_tokens: parseInt(maxTokens)
        };
    } else if (apiType === 'claude') {
        apiUrl = 'https://api.anthropic.com/v1/messages';
        requestData = {
            model: modelType,
            max_tokens: parseInt(maxTokens),
            messages: [
                { role: "human", content: `You are a SQL expert. Convert the following text to a SQL query. Use the provided database information:\n\n${formattedDbInfo}\n\nText to convert: ${textQuery}` }
            ]
        };
    } else {
        return res.status(400).json({ error: 'Invalid API type' });
    }

    try {
        const response = await axios.post(apiUrl, requestData, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                ...(apiType === 'claude' ? { 'anthropic-version': '2023-06-01' } : {})
            }
        });

        let sqlQuery;
        if (apiType === 'openai') {
            sqlQuery = response.data.choices[0].message.content;
        } else if (apiType === 'claude') {
            sqlQuery = response.data.content[0].text;
        }

        res.json({ sqlQuery });
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));