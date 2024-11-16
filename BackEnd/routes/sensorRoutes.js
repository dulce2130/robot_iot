import express from "express";
import { saveSensorData,
    getLastHourData,
    getLastWeekData,
    getLastMonthData,
 } from "../controllers/sensorController.js";

const router = express.Router();

router.post("/", saveSensorData);
router.get('/last-hour', getLastHourData);
router.get('/last-week', getLastWeekData);
router.get('/last-month', getLastMonthData);

export default router;
