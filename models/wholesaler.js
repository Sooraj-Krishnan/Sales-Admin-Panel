const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Wholesaler = sequelize.define(
    "Wholesaler",
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
      tableName: "wholesaler",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["mobile_number"],
        },
      ],
    }
  );

  return Wholesaler;
};
