const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());


// Routes
const authRoutes = require("./routes/authRoutes");
const municipalityRoutes = require("./routes/municipalityRoutes");
const votingCenterRoutes = require("./routes/votingCenterRoutes");
const roleRoutes = require("./routes/roleRoutes");
const reportRoutes = require("./routes/reportRoutes");

app.use("/auth", authRoutes);
app.use("/municipality", municipalityRoutes);
app.use("/votingCenter", votingCenterRoutes);
app.use("/report", reportRoutes);
app.use("/role", roleRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
