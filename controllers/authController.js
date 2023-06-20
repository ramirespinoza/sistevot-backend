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
    const municipalityVoters = user.VotingCenter.Municipality.name;
    const centerVoters = user.VotingCenter.Municipality.name;
    const roleId = user.roleId;

    if (!user) {
      return res.status(401).json({ message: "Credenciales invalidas" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        username,
        centerName,
        municipalityName,
        municipalityVoters,
        centerVoters,
        roleId,
      },
      secretKey,
      { expiresIn: "8h" }
    );

    res.json({
      token,
      centerName,
      municipalityName,
      municipalityVoters,
      centerVoters,
      roleId,
    });
  } catch (error) {
    console.error("Error finding user", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Cerrada sesión exitosamente" });
};

exports.updateTableName = async (req, res) => {
  const { tableName } = req.body;
  const { user } = req; // Access the user from req.user
  let username = await user;
  username = username.username;
  try {
    // Find the user
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the tableName column
    user.tableName = tableName;
    await user.save();

    res.json({ message: "tableName updated successfully" });
  } catch (error) {
    console.error("Error updating tableName", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
