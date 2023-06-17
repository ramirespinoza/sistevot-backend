const jwt = require("jsonwebtoken");
const { User, VotingCenter, Municipality } = require("../models");

const secretKey = "yourSecretKey";

exports.register = async (req, res) => {
  const { firstName, lastName, username, password, roleId, votingCenterId } =
    req.body;
  try {
    const user = await User.create({
      password,
      firstName,
      lastName,
      username,
      roleId,
      votingCenterId,
    });
    res.status(201).json({ message: "Usuario registrado exitosamente", user });
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
      include: [
        {
          model: VotingCenter,
          as: "VotingCenter",
          include: {
            model: Municipality,
            as: "Municipality",
          },
        },
      ],
    });
    const centerName = user.VotingCenter.name;
    const municipalityName = user.VotingCenter.Municipality.name;

    if (!user) {
      return res.status(401).json({ message: "Credenciales invalidas" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username, centerName, municipalityName },
      secretKey,
      { expiresIn: "8h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error finding user", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Cerrada sesión exitosamente" });
};
