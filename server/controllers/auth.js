import User from "../models/User";
import { hashPassword, comparePassword } from "../helpers/auth";

export const signUp = async (req, res) => {
  const { name, email, password, secret } = req.body;

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
  console.log(email, password);
};
