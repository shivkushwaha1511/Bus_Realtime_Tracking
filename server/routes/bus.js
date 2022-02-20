import express from "express";
import { addBus } from "../controllers/bus";

const router = express.Router();

import { isAdmin, requireSignin } from "../middlewares";

router.post("/add-bus", requireSignin, isAdmin, addBus);

module.exports = router;
