const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("sisfivotedb", "admin", "sisfivot2023", {
  host: "sisfivot.cuebcdfmq5mz.us-east-2.rds.amazonaws.com",
  dialect: "mysql",
});

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
