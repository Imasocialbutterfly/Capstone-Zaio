import User from "../models/User.js";
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = new User({ username, email, password });
    await user.save();

    const token = generateToken(user._id);

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(201).json({ 
      user: userWithoutPassword, 
      token 
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    
    res.json({ 
      user: userWithoutPassword, 
      token 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).json({ error: error.message });
  }
};

export const becomeHost = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.role = 'host';
    await user.save();

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.json({ 
      message: "Successfully upgraded to host",
      user: userWithoutPassword 
    });
  } catch (error) {
    console.error('Become host error:', error);
    res.status(400).json({ error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(400).json({ error: error.message });
  }
};