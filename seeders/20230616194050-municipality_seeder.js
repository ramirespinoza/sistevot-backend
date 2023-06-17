"use strict";

const { Municipality } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const municipalities = [
      {
        name: "Puerto Barrios",
        voters: 68043,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Amates",
        voters: 36452,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "El Estor",
        voters: 39487,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Livingston",
        voters: 45860,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Morales",
        voters: 61158,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await Municipality.bulkCreate(municipalities);

    console.log("Municipality seeder executed successfully.");
  },

  async down(queryInterface, Sequelize) {
    await Municipality.destroy({ where: {} });
    console.log("Municipality seeder reverted successfully.");
  },
};
