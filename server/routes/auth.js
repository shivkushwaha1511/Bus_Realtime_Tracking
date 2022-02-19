import express from "express";

const router = express.Router();

import { signUp, signIn } from "../controllers/auth";

// SignUp
router.post("/signup", signUp);
router.post("/signin", signIn);

module.exports = router;
