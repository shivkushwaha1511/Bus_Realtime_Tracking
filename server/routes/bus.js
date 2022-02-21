import express from "express";
import {
  addBus,
  getBus,
  deleteBus,
  busByBusno,
  updateBus,
  setCoordinates,
} from "../controllers/bus";

const router = express.Router();

import { isAdmin, requireSignin } from "../middlewares";

router.post("/add-bus", requireSignin, isAdmin, addBus);
router.get("/get-bus", getBus);
router.delete("/delete-bus/:_id", requireSignin, isAdmin, deleteBus);
router.get("/bus-by-busNo/:busNo", busByBusno);
router.put("/update-bus/:_id", requireSignin, isAdmin, updateBus);

router.get("/set-coordinates", setCoordinates);

module.exports = router;
