"use strict";

const { Role } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const roles = [
      {
        name: "Fiscal de Mesa",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Fiscal Departamental",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await Role.bulkCreate(roles);

    console.log("Role seeder executed successfully.");
  },

  async down(queryInterface, Sequelize) {
    await Role.destroy({ where: {} });

    console.log("Role seeder reverted successfully.");
  },
};
