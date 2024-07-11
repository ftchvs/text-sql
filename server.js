const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const openaiEndpoint = 'https://api.openai.com/v1/chat/completions';
const claudeEndpoint = 'https://api.anthropic.com/v1/messages';

async function generateSQLWithOpenAI(apiKey, dbInfo, textQuery) {
    const response = await axios.post(openaiEndpoint, {
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: `You are a SQL expert. Convert the following text to a SQL query. Use the provided database information: ${JSON.stringify(dbInfo)}` },
            { role: "user", content: textQuery }
        ]
    }, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    });

    return response.data.choices[0].message.content;
}

async function generateSQLWithClaude(apiKey, dbInfo, textQuery) {
    const response = await axios.post(claudeEndpoint, {
        model: "claude-3-opus-20240229",
        max_tokens: 1000,
        messages: [
            { role: "system", content: `You are a SQL expert. Convert the following text to a SQL query. Use the provided database information: ${JSON.stringify(dbInfo)}` },
            { role: "user", content: textQuery }
        ]
    }, {
        headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json',
            'anthropic-version': '2023-06-01'
        }
    });

    return response.data.content[0].text;
}

app.post('/convert', async (req, res) => {
    const { apiType, apiKey, tables, textQuery } = req.body;

    if (!apiKey || !tables || !textQuery) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        let sqlQuery;
        if (apiType === 'openai') {
            sqlQuery = await generateSQLWithOpenAI(apiKey, tables, textQuery);
        } else if (apiType === 'claude') {
            sqlQuery = await generateSQLWithClaude(apiKey, tables, textQuery);
        } else {
            return res.status(400).json({ error: 'Invalid API type' });
        }

        res.json({ sqlQuery });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.response?.data?.error?.message || error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));