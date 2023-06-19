const { VotingCenter } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const votingCenters = await VotingCenter.findAll();
    res.status(200).json({ votingCenters });
  } catch (error) {
    console.error("Error retrieving voting centers", error);
    res.status(500).json({ message: "Error interno de Servidor" });
  }
};
