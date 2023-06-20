const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    tableName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },

    votingCenterId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "User", // Specify the custom table name as 'user'
  }
);
User.associate = function (models) {
  User.belongsTo(models.Role, { foreignKey: "roleId", onDelete: "SET NULL" });
  User.belongsTo(models.VotingCenter, {
    foreignKey: "votingCenterId",
    onDelete: "SET NULL",
  });
  User.hasMany(models.Report, { foreignKey: "userId" });
};

module.exports = User;
