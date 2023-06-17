const jwt = require("jsonwebtoken");
const { User } = require("../models");

const secretKey = "yourSecretKey";

exports.authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    const user = User.findOne({ where: { username: decoded.username } });
    if (!user) {
      return res.status(401).json({ message: "Token Invalido" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error verifying token", error);
    res.status(500).json({ message: "Error interno de servidor" });
  }
};
