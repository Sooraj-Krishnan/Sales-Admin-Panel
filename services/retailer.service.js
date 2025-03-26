const { Retailer, Wholesaler, sequelize } = require("../models");

// Get retailers with a single wholesaler
exports.getRetailersWithSingleWholesaler = async () => {
  // Using a subquery to find retailers that are associated with exactly one wholesaler
  const retailers = await Retailer.findAll({
    include: [
      {
        model: Wholesaler,
        through: { attributes: [] },
      },
    ],
    attributes: {
      include: [
        [
          sequelize.literal(`(
            SELECT COUNT(*)
            FROM WholesalerRetailer
            WHERE retailer_id = Retailer.id
          )`),
          "wholesaler_count",
        ],
      ],
    },
    having: sequelize.literal("wholesaler_count = 1"),
    group: ["Retailer.id"],
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
