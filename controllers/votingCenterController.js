const { VotingCenter } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const { municipalityId } = req.query;

    const where = {}; // Create an empty object for the WHERE condition

    if (municipalityId) {
      where.municipalityId = municipalityId; // Add the municipalityId condition if it exists
    }

    const votingCenters = await VotingCenter.findAll({
      where, // Pass the WHERE condition to the query
    });

    res.status(200).json({ votingCenters });
  } catch (error) {
    console.error("Error retrieving voting centers", error);
    res.status(500).json({ message: "Error interno de Servidor" });
  }
};
