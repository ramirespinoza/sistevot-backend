const Sequelize = require("sequelize");
const database = require("../config/database");

const sequelize = database;

const User = require("./user");
const models = {
  User,
 
};

sequelize.models = models;

module.exports = {
  ...models,
  sequelize,
  Sequelize,
};
