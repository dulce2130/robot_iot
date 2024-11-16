import express from "express";
import { saveSensorData } from "../controllers/sensorController.js";

const router = express.Router();

router.post("/", saveSensorData);

export default router;
