"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ReportType = sequelize.define(
  "ReportType",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "reportType",
  }
);

ReportType.associate = function (models) {
  ReportType.hasMany(models.Report, { foreignKey: "reportTypeId" });
};
module.exports = ReportType;
