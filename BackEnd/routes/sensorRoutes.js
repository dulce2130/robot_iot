import express from "express";
import { saveSensorData,
    getLastHourData,
    getLastWeekData,
    getLastMonthData,
    getLatestSensorData
 } from "../controllers/sensorController.js";

const router = express.Router();

router.post("/", saveSensorData);
router.get('/last-hour', getLastHourData);
router.get('/last-week', getLastWeekData);
router.get('/last-month', getLastMonthData);
router.get('/latest', getLatestSensorData);

export default router;
