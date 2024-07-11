// Model options for each API type
const modelOptions = {
    openai: ['gpt-3.5-turbo', 'gpt-4'],
    claude: ['claude-2.1', 'claude-instant-1']
};

// Function to update model options based on selected API
function updateModelOptions() {
    const apiType = document.getElementById('apiType').value;
    const modelSelect = document.getElementById('modelType');
    modelSelect.innerHTML = ''; // Clear existing options
    modelOptions[apiType].forEach(model => {
        const option = document.createElement('option');
        option.value = model;
        option.textContent = model;
        modelSelect.appendChild(option);
    });
}

// Add event listener to API type dropdown
document.getElementById('apiType').addEventListener('change', updateModelOptions);

// Function to add a new table
function addTable() {
    const tablesContainer = document.getElementById('tables-container');
    const tableTemplate = document.getElementById('table-template');
    const tableElement = tableTemplate.content.cloneNode(true);
    
    tableElement.querySelector('.add-column').addEventListener('click', addColumn);
    tableElement.querySelector('.remove-table').addEventListener('click', removeTable);
    
    tablesContainer.appendChild(tableElement);
}

// Function to add a new column to a table
function addColumn(event) {
    const columnsContainer = event.target.previousElementSibling;
    const columnTemplate = document.getElementById('column-template');
    const columnElement = columnTemplate.content.cloneNode(true);
    
    columnElement.querySelector('.remove-column').addEventListener('click', removeColumn);
    columnElement.querySelector('.column-type').addEventListener('change', showDataTypeExample);
    
    columnsContainer.appendChild(columnElement);
}

// Function to remove a table
function removeTable(event) {
    event.target.closest('.table-info').remove();
}

// Function to remove a column
function removeColumn(event) {
    event.target.closest('.column-info').remove();
}

// Function to show data type example
function showDataTypeExample(event) {
    const select = event.target;
    const selectedOption = select.options[select.selectedIndex];
    const exampleDiv = select.closest('.column-info').nextElementSibling;
    
    const dataTypeInfo = {
        'INT': 'Whole numbers, e.g., 1, 100, -5',
        'VARCHAR': 'Variable-length string, e.g., \'Hello\', \'John Doe\'',
        'DATE': 'Date values, e.g., \'2023-07-10\'',
        'BOOLEAN': 'True/False values',
        'FLOAT': 'Decimal numbers, e.g., 3.14, -0.001',
        'DECIMAL': 'Precise decimal numbers, e.g., for currency'
    };
    
    exampleDiv.textContent = selectedOption.value ? `Example: ${dataTypeInfo[selectedOption.value]}` : '';
}

// Function to toggle data type information visibility
function toggleDataTypeInfo() {
    const dataTypeInfo = document.getElementById('data-type-info');
    dataTypeInfo.style.display = dataTypeInfo.style.display === 'none' ? 'block' : 'none';
}

// Add event listener for the "Add Table" button
document.getElementById('add-table').addEventListener('click', addTable);

// Add button to toggle data type information
const addTableButton = document.getElementById('add-table');
const toggleButton = document.createElement('button');
toggleButton.textContent = 'Toggle Data Type Info';
toggleButton.type = 'button';
toggleButton.addEventListener('click', toggleDataTypeInfo);
addTableButton.parentNode.insertBefore(toggleButton, addTableButton.nextSibling);

// Function to gather database information
function gatherDatabaseInfo() {
    const tables = [];
    document.querySelectorAll('.table-info').forEach(tableElement => {
        const tableName = tableElement.querySelector('.table-name').value;
        const columns = [];
        tableElement.querySelectorAll('.column-info').forEach(columnElement => {
            columns.push({
                name: columnElement.querySelector('.column-name').value,
                type: columnElement.querySelector('.column-type').value
            });
        });
        tables.push({ name: tableName, columns: columns });
    });
    return JSON.stringify(tables);
}

// Event listener for form submission
document.getElementById('sqlForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const apiType = document.getElementById('apiType').value;
    const apiKey = document.getElementById('apiKey').value;
    const modelType = document.getElementById('modelType').value;
    const maxTokens = document.getElementById('maxTokens').value;
    const dbInfo = gatherDatabaseInfo();
    const textQuery = document.getElementById('textQuery').value;
    const resultDiv = document.getElementById('result');
    
    resultDiv.innerHTML = 'Converting...';
    
    try {
        const response = await fetch('/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ apiType, apiKey, modelType, maxTokens, dbInfo, textQuery }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
            resultDiv.innerHTML = `<strong>SQL Query:</strong><br>${data.sqlQuery}`;
        } else {
            resultDiv.innerHTML = `Error: ${data.error}`;
        }
    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    addTable();
    updateModelOptions();
});