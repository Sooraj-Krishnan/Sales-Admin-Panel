const { Retailer, Wholesaler, sequelize } = require("../models");

// Get retailers with a single wholesaler
exports.getRetailersWithSingleWholesaler = async () => {
  // Using a subquery to find retailers that are associated with exactly one wholesaler
  const retailers = await Retailer.findAll({
    attributes: [
      "id",
      "name",
      "mobile_number",
      // Add any other Retailer attributes you want to include
      [
        sequelize.literal(`(
          SELECT COUNT(*)
          FROM wholesaler_retailer
          WHERE retailerId = Retailer.id
        )`),
        "wholesaler_count",
      ],
    ],
    include: [
      {
        model: Wholesaler,
        through: { attributes: [] },
        attributes: ["id", "name"], // Explicitly specify Wholesaler attributes
      },
    ],
    having: sequelize.literal("wholesaler_count = 1"),
    group: ["Retailer.id", "Wholesalers.id"], // Include Wholesalers.id in GROUP BY
  });

  return retailers;
};

// Create a new retailer
exports.createRetailer = async (retailerData) => {
  return await Retailer.create(retailerData);
};

// Associate a retailer with a wholesaler
exports.associateWithWholesaler = async (retailerId, wholesalerId) => {
  const retailer = await Retailer.findByPk(retailerId);
  const wholesaler = await Wholesaler.findByPk(wholesalerId);

  if (!retailer) {
    throw new Error(`Retailer with ID ${retailerId} not found`);
  }

  if (!wholesaler) {
    throw new Error(`Wholesaler with ID ${wholesalerId} not found`);
  }

  return await retailer.addWholesaler(wholesaler);
};
