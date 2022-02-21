import express from "express";
import {
  addBus,
  getBus,
  deleteBus,
  busByBusno,
  updateBus,
} from "../controllers/bus";

const router = express.Router();

import { isAdmin, requireSignin } from "../middlewares";

router.post("/add-bus", requireSignin, isAdmin, addBus);
router.get("/get-bus", requireSignin, isAdmin, getBus);
router.delete("/delete-bus/:_id", requireSignin, isAdmin, deleteBus);
router.get("/bus-by-busNo/:busNo", busByBusno);
router.put("/update-bus/:_id", requireSignin, isAdmin, updateBus);

module.exports = router;
