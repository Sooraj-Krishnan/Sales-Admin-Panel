const express = require("express");
const stockController = require("../controllers/stock.controller");

const router = express.Router();

// Create a new stock transaction
router.post("/", stockController.createStock);

// Seed stock data for 2021
router.post("/seed", stockController.seedStockData);

module.exports = router;
