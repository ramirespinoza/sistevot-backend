"use strict";

const { ReportType } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const reportTypes = [
      {
        name: "Acta de Impugnacion",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Denuncia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Acta Final de Escrutinio",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await ReportType.bulkCreate(reportTypes);
    console.log("ReportType seeder executed successfully.");
  },

  async down(queryInterface, Sequelize) {
    await ReportType.destroy({ where: {} });
    console.log("ReportType seeder reverted successfully.");
  },
};
