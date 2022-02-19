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
