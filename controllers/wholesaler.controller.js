const wholesalerService = require("../services/wholesaler.service");
const createError = require("http-errors");

// Controller for getting a wholesaler with associated retailers
exports.getWholesalerWithRetailers = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw createError(400, "Wholesaler ID is required");
    }

    const data = await wholesalerService.getWholesalerWithRetailers(id);

    if (!data) {
      throw createError(404, "Wholesaler not found");
    }

    res.status(200).json({
      status: true,
      message: "Wholesaler with retailers retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// Controller for getting total monthly turnover of each wholesaler for a year
exports.getMonthlyTurnover = async (req, res, next) => {
  try {
    const { year } = req.query;

    if (!year) {
      throw createError(400, "Year parameter is required");
    }

    const data = await wholesalerService.getMonthlyTurnover(year);

    res.status(200).json({
      status: true,
      message: "Monthly turnover retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// Controller for getting max turnover of each wholesaler from a single retailer
exports.getMaxTurnoverFromSingleRetailer = async (req, res, next) => {
  try {
    const data = await wholesalerService.getMaxTurnoverFromSingleRetailer();

    res.status(200).json({
      status: true,
      message: "Max turnover from single retailer retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// Create a new wholesaler
exports.createWholesaler = async (req, res, next) => {
  try {
    const data = await wholesalerService.createWholesaler(req.body);

    res.status(201).json({
      status: true,
      message: "Wholesaler created successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};
