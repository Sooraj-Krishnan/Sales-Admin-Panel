const express = require("express");
const retailerController = require("../controllers/retailer.controller");

const router = express.Router();

// Create a new retailer
router.post("/", retailerController.createRetailer);

// Get retailers with a single wholesaler (API 2)
router.get(
  "/with-single-wholesaler",
  retailerController.getRetailersWithSingleWholesaler
);

// Associate a retailer with a wholesaler
router.post(
  "/:retailerId/wholesalers/:wholesalerId",
  retailerController.associateWithWholesaler
);

module.exports = router;
