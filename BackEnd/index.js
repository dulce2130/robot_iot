import expresss from "express";
import conectarDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import sensorRoutes from "./routes/sensorRoutes.js";
import path from "path";
import cors from "cors";


const app = expresss();
app.use(expresss.json())

conectarDB()

const dominiosPermitidos = ["http://localhost:3000"]
const corsOptions = {
    origin: function (origin, callback) {
        if (dominiosPermitidos.indexOf(origin) !== 1) {
            callback(null, true)
        } else {
            callback(new Error("No permitido por CORS"))
        }
    }
}


app.use(cors(corsOptions))

app.use("/api/user", userRoutes)
app.use("/api/data", sensorRoutes)

app.listen(4000, () => {
    console.log("Servidor funcionando en el puerto 4000")
})

