
# SQL Sorcer

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

SQL Sorcer is a powerful application designed to help users build SQL queries for creating audience targets. Whether you are an experienced SQL developer or a beginner, SQL Sorcer simplifies the process of managing events and generating precise audience targets.

## 🚀 Features

- 🧠 **AI-Powered Conversion**: Transform natural language queries into precise SQL statements using advanced AI models.
- 🔄 **Dual API Support**: Choose between OpenAI's GPT and Anthropic's Claude for diverse AI capabilities.
- 📊 **Multi-Table Support**: Handle complex database schemas with multiple tables and relationships.
- 🔧 **Dynamic Schema Input**: Easily input and modify your database structure through the user interface.
- 💻 **User-Friendly Interface**: Intuitive web-based UI for seamless interaction.
- 🔒 **Secure Backend**: Node.js server ensuring safe handling of API requests and responses.
- 📚 **Educational Tool**: Learn SQL through natural language interactions.

## 🎯 Use Cases

- 📊 **Data Analysis**: Quickly generate SQL queries for data exploration and reporting.
- 🎓 **SQL Learning**: Help students understand how natural language translates to SQL.
- 💼 **Business Intelligence**: Enable non-technical users to query databases using familiar language.
- 🧪 **Prototyping**: Rapidly prototype database queries for application development.
- 🔍 **Database Exploration**: Easily explore and understand new or complex database schemas.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) (version 6.x or higher)

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/ftchvs/sql-sorcer.git
   \`\`\`
2. Navigate to the project directory:
   \`\`\`bash
   cd sql-sorcer
   \`\`\`
3. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

### Running the Application

To start the application, run:
\`\`\`bash
npm start
\`\`\`

The application will be available at \`http://localhost:3000\`.

## Usage

1. **Track Events**: Add and manage events within your database.
2. **Build SQL Queries**: Use the SQL Sorcer interface to build complex SQL queries for creating audience targets.
3. **Generate Audience Targets**: Run the generated SQL queries to create precise audience targets based on your event data.

## API Documentation

### Endpoint: /api/convert
- **Method**: POST
- **Description**: Converts natural language to SQL.
- **Request**:
  \`\`\`json
  {
    "query": "Show me all users who signed up in the last month."
  }
  \`\`\`
- **Response**:
  \`\`\`json
  {
    "sql": "SELECT * FROM users WHERE signup_date >= NOW() - INTERVAL 1 MONTH;"
  }
  \`\`\`

## FAQ

**Q1: How do I add a new event?**

A1: Navigate to the 'Events' section and click on 'Add Event'. Fill in the required details and click 'Save'.

**Q2: Can I use SQL Sorcer with any database?**

A2: Yes, SQL Sorcer supports multiple database types. Ensure your database schema is correctly inputted in the 'Schema' section.

## Changelog

### v1.0.0
- Initial release with AI-powered SQL conversion, multi-table support, and dynamic schema input.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   \`\`\`bash
   git checkout -b feature/your-feature-name
   \`\`\`
3. Make your changes and commit them:
   \`\`\`bash
   git commit -m 'Add some feature'
   \`\`\`
4. Push to the branch:
   \`\`\`bash
   git push origin feature/your-feature-name
   \`\`\`
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or suggestions, feel free to open an issue or contact the project maintainers at [your-email@example.com].
