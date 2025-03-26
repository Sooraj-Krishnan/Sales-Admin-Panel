const express = require("express");
const wholesalerController = require("../controllers/wholesaler.controller");

const router = express.Router();

// Create a new wholesaler
router.post("/", wholesalerController.createWholesaler);

// Get a wholesaler with associated retailers (API 1)
router.get("/:id/retailers", wholesalerController.getWholesalerWithRetailers);

// Get monthly turnover for each wholesaler (API 3)
router.get("/monthly-turnover", wholesalerController.getMonthlyTurnover);

// Get max turnover from a single retailer (API 4)
router.get(
  "/max-turnover",
  wholesalerController.getMaxTurnoverFromSingleRetailer
);

module.exports = router;
