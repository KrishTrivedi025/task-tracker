import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

const toClientUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
});

// @route   POST /api/auth/register
// @desc    Register a new user and return a token
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      user: toClientUser(user),
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/auth/login
// @desc    Authenticate a user and return a token
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // password has select:false on the schema, so request it explicitly
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      user: toClientUser(user),
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/auth/me
// @desc    Get the current authenticated user
export const getMe = async (req, res) => {
  res.json({ user: toClientUser(req.user) });
};
