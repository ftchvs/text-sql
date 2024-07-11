// Model options for each API type
const modelOptions = {
    openai: ['gpt-3.5-turbo', 'gpt-4'],
    claude: ['claude-2.1', 'claude-instant-1']
};

// SQL Data Types
const sqlDataTypes = [
    // Numeric Data Types
    'BIT', 'TINYINT', 'SMALLINT', 'MEDIUMINT', 'INT', 'INTEGER', 'BIGINT', 'SERIAL', 
    'SMALLSERIAL', 'BIGSERIAL', 'DECIMAL', 'NUMERIC', 'FLOAT', 'DOUBLE', 'REAL', 
    'MONEY', 'SMALLMONEY',

    // String Data Types
    'CHAR', 'VARCHAR', 'TINYTEXT', 'TEXT', 'MEDIUMTEXT', 'LONGTEXT', 'NCHAR', 
    'NVARCHAR', 'NTEXT', 'LONGVARCHAR', 'ENUM', 'SET',

    // Binary Data Types
    'BINARY', 'VARBINARY', 'TINYBLOB', 'BLOB', 'MEDIUMBLOB', 'LONGBLOB', 'IMAGE', 
    'RAW', 'UROWID', 'ROWVERSION',

    // Date and Time Data Types
    'DATE', 'TIME', 'DATETIME', 'TIMESTAMP', 'SMALLDATETIME', 'YEAR', 'INTERVAL', 
    'TIMESTAMP WITH TIME ZONE', 'TIMESTAMP WITHOUT TIME ZONE',

    // Boolean Data Types
    'BOOLEAN', 'BOOL', 'BIT',

    // Spatial Data Types
    'GEOMETRY', 'POINT', 'LINESTRING', 'POLYGON', 'GEOGRAPHY',

    // Network Address Data Types
    'CIDR', 'INET', 'MACADDR',

    // JSON and XML Data Types
    'JSON', 'JSONB', 'XML', 'XMLTYPE',

    // Specialized Data Types
    'UUID', 'TSVECTOR', 'TSQUERY', 'HSTORE', 'SXML', 'ROWID', 'HIERARCHYID', 'ARRAY', 'BIT VARYING',

    // Legacy Data Types
    'IMAGE', 'TEXT'
];

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

// Function to update SQL data types in dropdown
function updateSQLDataTypes(selectElement) {
    sqlDataTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        selectElement.appendChild(option);
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
    updateSQLDataTypes(columnElement.querySelector('.column-type'));
    
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
        'BIT': 'Binary values (MySQL, SQL Server)',
        'TINYINT': 'Very small range of whole numbers',
        'SMALLINT': 'Small range of whole numbers',
        'MEDIUMINT': 'Medium range of whole numbers (MySQL)',
        'INT': 'Whole numbers',
        'INTEGER': 'Whole numbers',
        'BIGINT': 'Large range of whole numbers',
        'SERIAL': 'Auto-incrementing integer (PostgreSQL)',
        'SMALLSERIAL': 'Auto-incrementing small integer (PostgreSQL)',
        'BIGSERIAL': 'Auto-incrementing large integer (PostgreSQL)',
        'DECIMAL': 'Exact numeric values with fixed precision and scale',
        'NUMERIC': 'Exact numeric values with fixed precision and scale',
        'FLOAT': 'Single precision floating-point numbers',
        'DOUBLE': 'Double precision floating-point numbers',
        'REAL': 'Single precision floating-point numbers (ANSI SQL, PostgreSQL)',
        'MONEY': 'Currency values (SQL Server)',
        'SMALLMONEY': 'Smaller range of currency values (SQL Server)',
        'CHAR': 'Fixed-length character string',
        'VARCHAR': 'Variable-length character string',
        'TINYTEXT': 'Very small text (MySQL)',
        'TEXT': 'Large variable-length text',
        'MEDIUMTEXT': 'Medium variable-length text (MySQL)',
        'LONGTEXT': 'Large variable-length text (MySQL)',
        'NCHAR': 'Fixed-length Unicode character string',
        'NVARCHAR': 'Variable-length Unicode character string',
        'NTEXT': 'Large variable-length Unicode text (SQL Server, deprecated)',
        'LONGVARCHAR': 'Large variable-length string (ANSI SQL)',
        'ENUM': 'Enumeration, a string object with a predefined set of values (MySQL)',
        'SET': 'String object that can have zero or more values, chosen from a list of allowed values (MySQL)',
        'BINARY': 'Fixed-length binary data',
        'VARBINARY': 'Variable-length binary data',
        'TINYBLOB': 'Very small binary large object (MySQL)',
        'BLOB': 'Binary large object',
        'MEDIUMBLOB': 'Medium binary large object (MySQL)',
        'LONGBLOB': 'Large binary large object (MySQL)',
        'IMAGE': 'Used for storing images (SQL Server, deprecated)',
        'RAW': 'Variable-length binary data (Oracle)',
        'UROWID': 'Universal row identifier (Oracle)',
        'ROWVERSION': 'Automatically generated unique binary numbers for version-stamping table rows (SQL Server)',
        'DATE': 'Date values',
        'TIME': 'Time values',
        'DATETIME': 'Combined date and time values',
        'TIMESTAMP': 'Date and time values with time zone information',
        'SMALLDATETIME': 'Lower precision date and time values (SQL Server)',
        'YEAR': 'Year values',
        'INTERVAL': 'Time intervals (PostgreSQL, Oracle)',
        'TIMESTAMP WITH TIME ZONE': 'Date and time values with time zone information (PostgreSQL, Oracle)',
        'TIMESTAMP WITHOUT TIME ZONE': 'Date and time values without time zone information (PostgreSQL, Oracle)',
        'BOOLEAN': 'True/False values',
        'BOOL': 'True/False values',
        'GEOMETRY': 'Spatial data types for geometric data',
        'POINT': 'A point in a 2D space',
        'LINESTRING': 'A sequence of points forming a line',
        'POLYGON': 'A sequence of points forming a polygon',
        'GEOGRAPHY': 'Spatial data for geographic objects (PostgreSQL, SQL Server)',
        'CIDR': 'IPv4 or IPv6 network',
        'INET': 'IPv4 or IPv6 address',
        'MACADDR': 'MAC address',
        'JSON': 'JSON formatted text',
        'JSONB': 'Binary JSON format (PostgreSQL)',
        'XML': 'XML formatted text',
        'XMLTYPE': 'XML data (Oracle)',
        'UUID': 'Universally Unique Identifier',
        'TSVECTOR': 'Full-text search vector (PostgreSQL)',
        'TSQUERY': 'Full-text search query (PostgreSQL)',
        'HSTORE': 'Key-value pairs (PostgreSQL)',
        'SXML': 'Secure XML data type (DB2)',
        'ROWID': 'Unique identifier for rows in a table (Oracle)',
        'HIERARCHYID': 'Represents position in a hierarchy (SQL Server)',
        'ARRAY': 'Array of values (PostgreSQL)',
        'BIT VARYING': 'Variable-length bit string (PostgreSQL)',
        'IMAGE': 'Used for storing images (SQL Server, deprecated)',
        'TEXT': 'Non-Unicode large text (SQL Server, deprecated)'
    };
    
    exampleDiv.textContent = selectedOption.value ? `Example: ${dataTypeInfo[selectedOption.value]}` : '';
}

// Function to toggle data type information visibility
function toggleDataTypeInfo() {
    const dataTypeInfo = document.getElementById('data-type-info');
    dataTypeInfo.style.display = 'block'; // Always open
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

// Function to handle JSON schema upload
function handleSchemaUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const schema = JSON.parse(e.target.result);
            populateFormFromSchema(schema);
        };
        reader.readAsText(file);
    }
}

// Function to populate form from JSON schema
function populateFormFromSchema(schema) {
    const tablesContainer = document.getElementById('tables-container');
    tablesContainer.innerHTML = ''; // Clear existing tables
    schema.forEach(table => {
        const tableElement = document.getElementById('table-template').content.cloneNode(true);
        tableElement.querySelector('.table-name').value = table.name;
        const columnsContainer = tableElement.querySelector('.columns-container');
        table.columns.forEach(column => {
            const columnElement = document.getElementById('column-template').content.cloneNode(true);
            columnElement.querySelector('.column-name').value = column.name;
            updateSQLDataTypes(columnElement.querySelector('.column-type'));
            columnElement.querySelector('.column-type').value = column.type;
            columnsContainer.appendChild(columnElement);
        });
        tableElement.querySelector('.add-column').addEventListener('click', addColumn);
        tableElement.querySelector('.remove-table').addEventListener('click', removeTable);
        tablesContainer.appendChild(tableElement);
    });
}

// Add event listener for the JSON schema upload
document.getElementById('schemaUpload').addEventListener('change', handleSchemaUpload);

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
        console.log('Sending request:', { apiType, apiKey, modelType, maxTokens, dbInfo, textQuery });
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
    toggleDataTypeInfo(); // Ensure data type info is always open
});
