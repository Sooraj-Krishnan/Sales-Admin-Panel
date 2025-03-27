const { Wholesaler, Retailer, Stock, sequelize } = require("../models");
const { Op } = require("sequelize");

// Get a wholesaler with associated retailers
exports.getWholesalerWithRetailers = async (id) => {
  return await Wholesaler.findByPk(id, {
    include: [
      {
        model: Retailer,
        through: { attributes: [] }, // Exclude junction table data
      },
    ],
  });
};

// Create a new wholesaler
exports.createWholesaler = async (wholesalerData) => {
  return await Wholesaler.create(wholesalerData);
};

// Get monthly turnover for each wholesaler for a specific year
exports.getMonthlyTurnover = async (year) => {
  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;

  // Get wholesaler names first
  const wholesalers = await Wholesaler.findAll({
    attributes: ["id", "name"],
  });

  const wholesalerMap = {};
  wholesalers.forEach((w) => {
    wholesalerMap[w.id] = w.name;
  });

  // Then get turnover data without including Wholesaler model
  const result = await Stock.findAll({
    attributes: [
      "wholesaler_id",
      [sequelize.fn("MONTH", sequelize.col("date")), "month"],
      [sequelize.fn("SUM", sequelize.col("stock_amount")), "total_turnover"],
    ],
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
    },
    group: ["wholesaler_id", sequelize.fn("MONTH", sequelize.col("date"))],
    order: [
      ["wholesaler_id", "ASC"],
      [sequelize.fn("MONTH", sequelize.col("date")), "ASC"],
    ],
  });

  // Transform data for easier consumption
  const transformedData = {};

  result.forEach((item) => {
    const wholesalerId = item.wholesaler_id;
    const month = item.getDataValue("month");
    const turnover = parseFloat(item.getDataValue("total_turnover"));
    const wholesalerName =
      wholesalerMap[wholesalerId] || `Wholesaler ${wholesalerId}`;

    if (!transformedData[wholesalerId]) {
      transformedData[wholesalerId] = {
        wholesaler_id: wholesalerId,
        wholesaler_name: wholesalerName,
        monthly_turnover: {},
      };
    }

    transformedData[wholesalerId].monthly_turnover[month] = turnover;
  });

  return Object.values(transformedData);
};

// Get max turnover of each wholesaler from a single retailer
exports.getMaxTurnoverFromSingleRetailer = async () => {
  // First get wholesaler and retailer names
  const wholesalers = await Wholesaler.findAll({
    attributes: ["id", "name"],
  });

  const retailers = await Retailer.findAll({
    attributes: ["id", "name"],
  });

  const wholesalerMap = {};
  wholesalers.forEach((w) => {
    wholesalerMap[w.id] = w.name;
  });

  const retailerMap = {};
  retailers.forEach((r) => {
    retailerMap[r.id] = r.name;
  });

  // Get turnover data without including Wholesaler and Retailer models
  const turnovers = await Stock.findAll({
    attributes: [
      "wholesaler_id",
      "retailer_id",
      [sequelize.fn("SUM", sequelize.col("stock_amount")), "total_turnover"],
    ],
    group: ["wholesaler_id", "retailer_id"],
    order: [
      ["wholesaler_id", "ASC"],
      [sequelize.fn("SUM", sequelize.col("stock_amount")), "DESC"],
    ],
  });

  // Find the max turnover for each wholesaler
  const maxTurnoverMap = {};

  turnovers.forEach((turnover) => {
    const wholesalerId = turnover.wholesaler_id;
    const retailerId = turnover.retailer_id;
    const currentTurnover = parseFloat(turnover.getDataValue("total_turnover"));

    if (
      !maxTurnoverMap[wholesalerId] ||
      currentTurnover > maxTurnoverMap[wholesalerId].turnover
    ) {
      maxTurnoverMap[wholesalerId] = {
        wholesaler_id: wholesalerId,
        wholesaler_name:
          wholesalerMap[wholesalerId] || `Wholesaler ${wholesalerId}`,
        retailer_id: retailerId,
        retailer_name: retailerMap[retailerId] || `Retailer ${retailerId}`,
        turnover: currentTurnover,
      };
    }
  });

  return Object.values(maxTurnoverMap);
};
