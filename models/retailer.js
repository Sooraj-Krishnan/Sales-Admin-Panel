const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Retailer = sequelize.define(
    "Retailer",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      mobile_number: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
        validate: {
          is: /^[0-9]{10}$/,
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "retailer",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["mobile_number"],
        },
      ],
    }
  );

  return Retailer;
};
