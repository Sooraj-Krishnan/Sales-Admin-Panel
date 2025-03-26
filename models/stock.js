const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Stock = sequelize.define(
    "Stock",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      wholesaler_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "wholesaler",
          key: "id",
        },
      },
      retailer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "retailer",
          key: "id",
        },
      },
      stock_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "stock",
      timestamps: true,
      indexes: [
        {
          fields: ["wholesaler_id", "retailer_id", "date"],
        },
      ],
    }
  );

  return Stock;
};
