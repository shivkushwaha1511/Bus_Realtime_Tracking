import express from "express";

const router = express.Router();

import {
  signUp,
  signIn,
  currentUser,
  currentAdmin,
  updateProfile,
  forgotPassword,
} from "../controllers/auth";
import { requireSignin, isAdmin } from "../middlewares";

// SignUp
router.post("/signup", signUp);
router.post("/signin", signIn);

// Verifying user for accessing pages
router.get("/current-user", requireSignin, currentUser);
router.get("/current-admin", requireSignin, isAdmin, currentAdmin);

// Update profile
router.put("/update-profile", requireSignin, updateProfile);

router.post("/forgot-password", forgotPassword);

module.exports = router;
