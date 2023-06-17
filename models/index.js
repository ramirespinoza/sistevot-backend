const Sequelize = require("sequelize");
const database = require("../config/database");

const sequelize = database;

const User = require("./user");
const Role = require("./role");
const Municipality = require("./municipality");
const VotingCenter = require("./votingCenter");
const Table = require("./table");
const ReportType = require("./reportType");
const Report = require("./report");

const models = {
  User,
  Role,
  VotingCenter,
  Municipality,
  Table,
  ReportType,
  Report,
};

sequelize.models = models;
User.associate(models);
Role.associate(models);
VotingCenter.associate(models);
Municipality.associate(models);
Table.associate(models);
ReportType.associate(models);
Report.associate(models);

module.exports = {
  ...models,
  sequelize,
  Sequelize,
};
