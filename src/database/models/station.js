"use strict";
module.exports = (sequelize, DataTypes) => {
  const Station = sequelize.define(
    "Station",
    {
      name: DataTypes.STRING
    },
    {}
  );
  Station.associate = function(models) {
    Station.hasMany(models.Car, { foreignKey: "stationId" });
  };
  return Station;
};
