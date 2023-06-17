"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Municipality = sequelize.define(
  "Municipality",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    voters: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "municipality",
  }
);

Municipality.associate = function (models) {
  Municipality.hasMany(models.VotingCenter, { foreignKey: "municipalityId" });
};
module.exports = Municipality;
