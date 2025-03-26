const stockService = require("../services/stock.service");
const createError = require("http-errors");

// Record a new stock transaction
exports.createStock = async (req, res, next) => {
  try {
    const data = await stockService.createStock(req.body);

    res.status(201).json({
      status: true,
      message: "Stock transaction recorded successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// Seed stock data for the year 2021
exports.seedStockData = async (req, res, next) => {
  try {
    await stockService.seedStockData();

    res.status(200).json({
      status: true,
      message: "Stock data for 2021 seeded successfully",
    });
  } catch (error) {
    next(error);
  }
};
