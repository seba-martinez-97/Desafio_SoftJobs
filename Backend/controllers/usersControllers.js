import jwt from "jsonwebtoken";
import bcript from "bcryptjs";
import "dotenv/config";
import { userModel } from "../models/usersModel.js";

const register = async (req, res) => {
  const { email, password, rol, lenguage } = req.body;
  try {
    await userModel.create({
      email,
      password: bcript.hashSync(password),
      rol,
      lenguage,
    });
    return res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.log(error);

    if (error.code === "23505") {
      return res.status(400).json({ message: "Usuario ya existe" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    console.log("req.body-->", req.body);
    const { email, password } = req.body;
    const user = await userModel.findOneEmail(email);
    if (!user || !bcript.compareSync(password, user.password)) {
      console.log("Credenciales malas");
      return res.status(400).json({ message: "Credenciales invalidas" });
    }
    const payload = {
      email,
      user_id: user.user_id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res
      .status(200)
      .json({ message: "Usuario logeado correctamente", token, email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  try {
    console.log("requser-->", req.user);
    const { email } = req.user;
    const rows = await userModel.findOneEmail(email);
    console.log("rows-->", rows);
    return res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const userController = {
  login,
  register,
  getUser,
};