
# text-sql

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v14.x-green.svg)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-v6.x-red.svg)](https://www.npmjs.com/)

Welcome to **text-sql**! This tool helps you convert natural language text into SQL queries effortlessly. Whether you're a SQL novice or a seasoned developer, text-sql streamlines the process of database querying.

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

## 📽️ Demo

[![Video Demo](public/view/REC-20240710222331.mp4)](public/view/REC-20240710222331.mp4)

Click the image above to watch a video demo of text-sql in action.

## 🖼️ Screenshot

![Screenshot](public/view/screenshot.png)

## 🛠️ Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) (version 6.x or higher)

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ftchvs/text-sql.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd text-sql
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```

### Running the Application

To start the application, run:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## 📚 Usage

1. **Enter your query**: Type a natural language query in the input box.
2. **Convert to SQL**: Click the "Convert" button to generate the SQL query.
3. **Copy the SQL**: Copy the generated SQL query for use in your database management system.

## 🔄 API Documentation

### Endpoint: `/api/convert`
- **Method**: POST
- **Description**: Converts natural language to SQL.
- **Request**:
  ```json
  {
    "query": "Show me all users who signed up in the last month."
  }
  ```
- **Response**:
  ```json
  {
    "sql": "SELECT * FROM users WHERE signup_date >= NOW() - INTERVAL 1 MONTH;"
  }
  ```

## ❓ FAQ

**Q1: How do I add a new event?**

A1: Navigate to the 'Events' section and click on 'Add Event'. Fill in the required details and click 'Save'.

**Q2: Can I use text-sql with any database?**

A2: Yes, text-sql supports multiple database types. Ensure your database schema is correctly inputted in the 'Schema' section.

## 📜 Changelog

### v1.0.0
- Initial release with AI-powered SQL conversion, multi-table support, and dynamic schema input.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📬 Contact

For any inquiries or support, please contact [ftchvs](https://github.com/ftchvs).
