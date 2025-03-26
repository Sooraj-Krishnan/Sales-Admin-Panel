require("dotenv").config();
const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const { sequelize } = require("./models");

// Import routes
const wholesalerRoutes = require("./routes/wholesaler.routes");
const retailerRoutes = require("./routes/retailer.routes");
const stockRoutes = require("./routes/stock.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/wholesalers", wholesalerRoutes);
app.use("/api/retailers", retailerRoutes);
app.use("/api/stocks", stockRoutes);

// 404 handler
app.use((req, res, next) => {
  next(createError(404, "Not found"));
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: false,
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// Database connection and server startup
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // Sync models with database
    await sequelize.sync({ alter: true });
    console.log("Database synced successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

startServer();
