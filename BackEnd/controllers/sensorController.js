import Sensor from "../models/Sensor.js";
import cron from "node-cron";

const saveSensorData = async (req, res) => {
    try {
        const { temperature, humidity, sound, gas } = req.body;
        const newData = new Sensor({
            temperature,
            humidity,
            sound,
            gas,
            timestamp: new Date()
        });
        await newData.save();

        res.status(200).json({ message: "Datos guardados correctamente" });
    } catch (error) {
        console.error("Error al guardar datos:", error);
        res.status(500).json({ message: "Error al guardar datos" });
    }
};

// obtener datos agregados
const getAggregatedData = async (req, res, interval, groupBy) => {
    try {
        const data = await Sensor.aggregate([
            { $match: { timestamp: { $gte: interval } } },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: groupBy,
                            date: "$timestamp",
                            timezone: "America/Mexico_City", 
                        },
                    },
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

const getLatestSensorData = async (req, res) => {
    try {
        const latestData = await Sensor.findOne().sort({ timestamp: -1 }).exec();

        if (!latestData) {
            return res.status(404).json({ message: "No hay datos disponibles" });
        }

        res.status(200).json(latestData);
    } catch (error) {
        console.error("Error al obtener los últimos datos:", error);
        res.status(500).json({ message: "Error al obtener los últimos datos" });
    }
};

export {
    saveSensorData,
    getLastHourData,
    getLastWeekData,
    getLastMonthData,
    getLatestSensorData
};
