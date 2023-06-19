const { Municipality } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const municipalities = await Municipality.findAll();
    res.status(200).json({ municipalities });
  } catch (error) {
    console.error("Error retrieving municipalities", error);
    res.status(500).json({ message: "Error interno de Servidor" });
  }
};
