"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Table = sequelize.define(
  "Table",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Table",
  }
);
Table.associate = function (models) {};

module.exports = Table;
