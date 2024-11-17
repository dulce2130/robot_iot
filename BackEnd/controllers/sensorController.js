import Sensor from "../models/Sensor.js";
import cron from "node-cron";

const saveSensorData = async (req, res) => {
    try {
        const { temperature, humidity, sound, gas } = req.body;

        //intervalo de 5 minutos
        const intervalStart = new Date(Math.floor(Date.now() / (5 * 60 * 1000)) * (5 * 60 * 1000));
        const existingData = await Sensor.findOne({ timestamp: intervalStart });

        if (existingData) {
            // promedios
            existingData.temperature = (existingData.temperature + temperature) / 2;
            existingData.humidity = (existingData.humidity + humidity) / 2;
            existingData.sound = (existingData.sound + sound) / 2;
            existingData.gas = (existingData.gas + gas) / 2;
            await existingData.save();
        } else {
            // Crear nuevo registro
            const newData = new Sensor({ temperature, humidity, sound, gas, timestamp: intervalStart });
            await newData.save();
        }

        res.status(200).json({ message: "Datos guardados correctamente" });
    } catch (error) {
        console.error("Error al guardar datos:", error);
        res.status(500).json({ message: "Error al guardar datos" });
    }
};

// Función para obtener datos agregados
const getAggregatedData = async (req, res, interval, groupBy) => {
    try {
        const data = await Sensor.aggregate([
            { $match: { timestamp: { $gte: interval } } },
            {
                $group: {
                    _id: { $dateToString: { format: groupBy, date: "$timestamp" } },
                    avgTemperature: { $avg: "$temperature" },
                    avgHumidity: { $avg: "$humidity" },
                    avgSound: { $avg: "$sound" },
                    avgGas: { $avg: "$gas" },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener datos agregados:", error);
        res.status(500).json({ message: "Error al obtener datos agregados" });
    }
};

// Datos de la última hora (agrupados por intervalo de 5 minutos)
const getLastHourData = (req, res) => {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    getAggregatedData(req, res, oneHourAgo, "%H:%M");
};

// Datos de la última semana (agrupados por día)
const getLastWeekData = (req, res) => {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    getAggregatedData(req, res, oneWeekAgo, "%Y-%m-%d");
};

// Datos del último mes (agrupados por semana)
const getLastMonthData = (req, res) => {
    const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    getAggregatedData(req, res, oneMonthAgo,  "%Y-%m-%d");
};

// Rotación automática de datos antiguos (eliminar datos más antiguos de 30 días)
cron.schedule("0 0 * * *", async () => {
    try {
        const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        await Sensor.deleteMany({ timestamp: { $lt: oneMonthAgo } });
        console.log("Datos antiguos eliminados correctamente");
    } catch (error) {
        console.error("Error al eliminar datos antiguos:", error);
    }
});

export {
    saveSensorData,
    getLastHourData,
    getLastWeekData,
    getLastMonthData,
};
