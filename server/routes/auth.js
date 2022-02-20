import express from "express";

const router = express.Router();

import { signUp, signIn, currentUser } from "../controllers/auth";
import { requireSignin } from "../middlewares";

// SignUp
router.post("/signup", signUp);
router.post("/signin", signIn);

// Verifying user for accessing pages
router.get("/current-user", requireSignin, currentUser);

module.exports = router;
