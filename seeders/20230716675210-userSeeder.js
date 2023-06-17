"use strict";

const { User } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        firstName: "Luján",
        lastName: "Ortega",
        username: "reyes231",
        password: "reyes231",
        roleId: 1,
        votingCenterId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Akira",
        lastName: "González",
        username: "sol409",
        password: "sol409",
        roleId: 2,
        votingCenterId: 7,

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Pau",
        lastName: "Ortega",
        username: "uri885",
        password: "uri885",
        roleId: 2,
        votingCenterId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Aimar",
        lastName: "Morales",
        username: "jade498",
        password: "jade498",
        roleId: 1,
        votingCenterId: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await User.bulkCreate(users);

    console.log("User seeder executed successfully.");
  },

  async down(queryInterface, Sequelize) {
    await User.destroy({ where: {} });
    console.log("User seeder reverted successfully.");
  },
};
