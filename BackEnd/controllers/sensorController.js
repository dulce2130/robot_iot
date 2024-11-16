import Sensor from "../models/Sensor.js";

const saveSensorData = async (req, res) => {
    try {
        const { temperature, humidity, sound, gas } = req.body;
        const newData = new Sensor({ temperature, humidity, sound, gas });
        await newData.save();
        res.status(200).json({ message: "Datos guardados correctamente" });
    } catch (error) {
        console.error("Error al guardar datos:", error);
        res.status(500).json({ message: "Error al guardar datos" });
    }
};

// Última hora
const getLastHourData = async (req, res) => {
    try {
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000); // 1 hora atrás
        const data = await Sensor.find({ timestamp: { $gte: oneHourAgo } });
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener datos de la última hora:", error);
        res.status(500).json({ message: "Error al obtener datos de la última hora" });
    }
};

// Última semana
const getLastWeekData = async (req, res) => {
    try {
        const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 días atrás
        const data = await Sensor.find({ timestamp: { $gte: oneWeekAgo } });
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener datos de la última semana:", error);
        res.status(500).json({ message: "Error al obtener datos de la última semana" });
    }
};

// Último mes
const getLastMonthData = async (req, res) => {
    try {
        const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 días atrás
        const data = await Sensor.find({ timestamp: { $gte: oneMonthAgo } });
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener datos del último mes:", error);
        res.status(500).json({ message: "Error al obtener datos del último mes" });
    }
};

export {
    saveSensorData,
    getLastHourData,
    getLastWeekData,
    getLastMonthData
}