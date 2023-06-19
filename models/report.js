"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Report = sequelize.define(
  "Report",
  {
    description: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    link: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    userId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    reportTypeId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "Report",
  }
);
Report.associate = function (models) {
  Report.belongsTo(models.ReportType, {
    foreignKey: "reportTypeId",
    onDelete: "SET NULL",
  });
  Report.belongsTo(models.User, {
    foreignKey: "userId",
    onDelete: "SET NULL",
  });
};
module.exports = Report;
