const jwt = require("jsonwebtoken");
const { User } = require("../models");

const secretKey = "yourSecretKey";

exports.register = async (req, res) => {
  const { firstName, lastName, username, password } = req.body;
  try {
    await User.create({
      password,
      firstName,
      lastName,
      username,
    });
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).json({ message: "Error interno de servidor" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user
    const user = await User.findOne({
      where: {
        username,
        password,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Credenciales invalidas" });
    }

    // Generate JWT token
    const token = jwt.sign({ username }, secretKey, { expiresIn: "8h" });

    res.json({ token });
  } catch (error) {
    console.error("Error finding user", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
