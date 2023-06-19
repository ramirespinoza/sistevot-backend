const { Report, ReportType, User } = require("../models");
const { uploadFileToS3 } = require("../utils/s3Upload");
const bucketName = "s3votaciones"; // Replace with your S3 bucket name

exports.getAll = async (req, res) => {
  try {
    const { reportTypeId, votingCenterId } = req.query;
    const { user } = req; // Access the user from req.user
    let userId = await user;
    const roleId = userId.roleId;
    userId = userId.id;

    const whereClause = {};
    const reportWhereClause = {};
    if (reportTypeId) {
      reportWhereClause.reportTypeId = reportTypeId;
      if (roleId === 1) {
        reportWhereClause.userId = userId;
      }
    }
    if (votingCenterId) {
      whereClause["$User.votingCenterId$"] = votingCenterId;
    }

    const reports = await Report.findAll({
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName"],
          where: whereClause, // Apply the filter on the relationship
        },
        {
          model: ReportType,
          attributes: ["name"],
        },
      ],
      where: reportWhereClause,
    });

    res.status(200).json({ reports });
  } catch (error) {
    console.error("Error retrieving reports", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.registerReport = async (req, res) => {
  try {
    const { description, reportTypeId } = req.body;
    const { user } = req; // Access the user from req.user
    let userId = await user;
    userId = userId.id;

    const fileContent = Buffer.from(req.files.file.data, "binary");
    const reportType = await ReportType.findOne({
      where: { id: reportTypeId },
    });

    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = String(currentDate.getFullYear());
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}`;

    const imageFileName = `${reportType.name}-${formattedDateTime}-${req.files.file.name}`;
    const imageUrl = await uploadFileToS3(
      fileContent,
      imageFileName,
      bucketName
    );

    // Create a new report
    const newReport = await Report.create({
      description,
      link: imageUrl,
      userId: userId,
      reportTypeId,
    });

    res.status(201).json({ message: "Reporte registro exitosamente" });
  } catch (error) {
    console.error("Error creating report", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
