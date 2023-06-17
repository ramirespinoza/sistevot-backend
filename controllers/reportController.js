const { Report } = require("../models");

exports.getAll = async (req, res) => {
  try {
    //le agregas filtros jeje salu2
    //filtros municipality y votingCenter
    //esa info esta en user.js o en migraciones lo podes ver
    //sino dejalo asixd
    const reports = await Report.findAll();
    res.status(200).json({ reports });
  } catch (error) {
    console.error("Error retrieving municipalities", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.registerReport = async (req, res) => {
  try {
    const { description, image, userId, reportTypeId } = req.body;
    // no se ahi lo seguis desde aqui
    // Create a new report
    const newReport = await Report.create({
      description,
      link,
      userId,
      reportTypeId,
    });

    res
      .status(201)
      .json({ message: "Report registered successfully", report: newReport });
  } catch (error) {
    console.error("Error creating report", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
