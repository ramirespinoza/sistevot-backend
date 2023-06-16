const jwt = require("jsonwebtoken");
const { User } = require("../models");

const secretKey = "yourSecretKey";

exports.authenticate = (req, res, next) => {
  // Get the token from the request header
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);
    // Find the user based on the decoded information
    const user = User.findOne({ where: { username: decoded.username } });

    if (!user) {
      return res.status(401).json({ message: "Token Invalido" });
    }

    // Attach the user information to the request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Error verifying token", error);
    res.status(500).json({ message: "Error interno de servidor" });
  }
};
