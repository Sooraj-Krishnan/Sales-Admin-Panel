const { Sequelize } = require("sequelize");
const config = require("../config/database");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: config.logging,
  }
);

const db = {
  sequelize,
  Sequelize,
  Wholesaler: require("./wholesaler")(sequelize, Sequelize),
  Retailer: require("./retailer")(sequelize, Sequelize),
  Stock: require("./stock")(sequelize, Sequelize),
};

// Associations based on requirements
// "wholesaler has n(many) number retailers and retailers can associate with n(many) number of wholesalers"
db.Wholesaler.belongsToMany(db.Retailer, { through: "wholesaler_retailer" });
db.Retailer.belongsToMany(db.Wholesaler, { through: "wholesaler_retailer" });

// "Wholesalers can sell stock to the retailers"
db.Stock.belongsTo(db.Wholesaler);
db.Stock.belongsTo(db.Retailer);
db.Wholesaler.hasMany(db.Stock);
db.Retailer.hasMany(db.Stock);

module.exports = db;
