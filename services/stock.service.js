const { Stock, Wholesaler, Retailer } = require("../models");

// Create a new stock transaction
exports.createStock = async (stockData) => {
  return await Stock.create(stockData);
};

// Seed stock data for the year 2021
exports.seedStockData = async () => {
  // First, get all wholesalers and retailers
  const wholesalers = await Wholesaler.findAll();
  const retailers = await Retailer.findAll();

  if (wholesalers.length === 0 || retailers.length === 0) {
    throw new Error("Cannot seed data: No wholesalers or retailers found");
  }

  const stockData = [];

  // Prepare mock data for Jan 2021 to Dec 2021
  for (const wholesaler of wholesalers) {
    for (const retailer of retailers) {
      // Create a record for each month
      for (let month = 1; month <= 12; month++) {
        // Format month with leading zero if needed
        const formattedMonth = month.toString().padStart(2, "0");

        // Create a random stock amount between 1000 and 50000
        const stockAmount = Math.random() * 49000 + 1000;

        stockData.push({
          wholesaler_id: wholesaler.id,
          retailer_id: retailer.id,
          stock_amount: parseFloat(stockAmount.toFixed(2)),
          date: `2021-${formattedMonth}-01`,
        });
      }
    }
  }

  // Insert all stock data in bulk
  return await Stock.bulkCreate(stockData);
};
