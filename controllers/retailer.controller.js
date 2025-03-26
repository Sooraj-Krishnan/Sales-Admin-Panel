const retailerService = require("../services/retailer.service");
const createError = require("http-errors");

// Controller for getting retailers with a single wholesaler
exports.getRetailersWithSingleWholesaler = async (req, res, next) => {
  try {
    const data = await retailerService.getRetailersWithSingleWholesaler();

    res.status(200).json({
      status: true,
      message: "Retailers with single wholesaler retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// Create a new retailer
exports.createRetailer = async (req, res, next) => {
  try {
    const data = await retailerService.createRetailer(req.body);

    res.status(201).json({
      status: true,
      message: "Retailer created successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// Associate a retailer with a wholesaler
exports.associateWithWholesaler = async (req, res, next) => {
  try {
    const { retailerId, wholesalerId } = req.params;

    if (!retailerId || !wholesalerId) {
      throw createError(400, "Retailer ID and Wholesaler ID are required");
    }

    await retailerService.associateWithWholesaler(retailerId, wholesalerId);

    res.status(200).json({
      status: true,
      message: "Association created successfully",
    });
  } catch (error) {
    next(error);
  }
};
