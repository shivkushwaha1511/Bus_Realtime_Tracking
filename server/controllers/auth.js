import User from "../models/User";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { name, email, password, secret } = req.body;

  // Validation
  if (!name) {
    return res.json({ error: "Name is required" });
  }

  if (!email) {
    return res.json({ error: "Email is required" });
  }

  const exist = await User.findOne({ email });
  if (exist) {
    return res.json({ error: "Email already exists" });
  }

  if (!password || password.length < 6) {
    return res.json({
      error: "Password is required and must 6 characters long",
    });
  }

  if (!secret) {
    return res.json({
      error: "Secret answer is required",
    });
  }

  // Save User to db
  const user = new User({
    name,
    email,
    password: await hashPassword(password),
    secret,
  });
  try {
    await user.save();
    res.json({ ok: true });
  } catch (err) {
    return res.json({
      error: "Error! Try again",
    });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email) {
    return res.json({ error: "Email is required" });
  }

  try {
    // User exist or not
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ error: "No user found" });
    }

    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and must 6 characters long",
      });
    }

    // Password verification
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({
        error: "Wrong password",
      });
    }

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    user.secret = undefined;

    res.json({
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    res.json({ error: "Error! Try again" });
  }
};

// Verifying user for accessing pages
export const currentUser = (req, res) => {
  res.json({ ok: true });
};

// Verifying admin for accessing pages
export const currentAdmin = (req, res) => {
  res.json({ ok: true });
};

// Update profile
export const updateProfile = async (req, res) => {
  const { name, password } = req.body;
  const data = {};

  if (password) {
    if (password.length < 6) {
      return res.json({ error: "Password must be 6 characters long" });
    } else {
      data.password = await hashPassword(password);
    }
  }

  if (name) {
    data.name = name;
  }
  try {
    const user = await User.findByIdAndUpdate(req.user._id, data, {
      new: true,
    });

    user.password = undefined;
    user.secret = undefined;

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.json({ error: "Error! Try again" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email, newPassword, secret } = req.body;

  //Validation
  if (!newPassword && newPassword.length < 6) {
    return res.json({
      error: "New password is required and minimum 6 characters long",
    });
  }

  if (!secret) {
    return res.json({
      error: "Secret is required",
    });
  }

  const user = await User.findOne({ email, secret });
  if (!user) {
    return res.json({
      error: "We can't verify you with these credentials",
    });
  }

  try {
    const hashed = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashed });
    return res.json({
      success: "Congrats! Now you can login with your new password",
    });
  } catch (err) {
    console.log(err);
    return res.json({
      error: "Something wrong! Try again",
    });
  }
};
