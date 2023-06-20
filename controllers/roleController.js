const { Role } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json({ roles });
  } catch (error) {
    console.error("Error retrieving roles", error);
    res.status(500).json({ message: "Error interno de Servidor" });
  }
};
