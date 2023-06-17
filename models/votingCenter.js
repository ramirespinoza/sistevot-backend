"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const VotingCenter = sequelize.define(
  "VotingCenter",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    voters: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    municipalityId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "votingcenter",
  }
);

VotingCenter.associate = function (models) {
  VotingCenter.belongsTo(models.Municipality, {
    foreignKey: "municipalityId",
    onDelete: "SET NULL",
  });
};

module.exports = VotingCenter;
