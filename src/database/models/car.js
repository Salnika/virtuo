"use strict";
module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define(
    "Car",
    {
      name: DataTypes.STRING,
      available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {}
  );
  Car.associate = function(models) {
    Car.belongsTo(models.Station, { foreignKey: "stationId" });
  };
  return Car;
};
