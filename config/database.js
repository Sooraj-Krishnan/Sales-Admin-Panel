require("dotenv").config(); // Make sure this is at the top

// Export configuration object instead of Sequelize instance
module.exports = {
  database: process.env.DB_NAME || "wholesaler",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  host: process.env.DB_HOST || "localhost",
  dialect: process.env.DB_DIALECT || "mysql", // Default to mysql if not set
  logging: false,
};

// The testConnection function is no longer needed here as connection will be handled in models/index.js
