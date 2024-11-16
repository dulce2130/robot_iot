import Sensor from "../models/Sensor.js";

export const saveSensorData = async (req, res) => {
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
