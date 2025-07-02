import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";
import jsonwebtoken from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }
    const isPassordValid = await bcrypt.compare(password, user.password);
    if (!isPassordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }
    const token = generateToken(user._id);
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Error in login: ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    const token = generateToken(user._id);
    res.status(201).json({ success: true, token });
  } catch (error) {
    console.error("Error in register: ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jsonwebtoken.sign(email + password, process.env.JWT_SECRET);
      res.status(200).json({ success: true, token });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error in adminLogin: ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
