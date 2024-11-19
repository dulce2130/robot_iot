import express from "express";
import { registrar, perfil, confirmar, autenticar, 
    comprobarToken, eliminarToken, olvidePassword, nuevoPassword,
    recibirCorreo} from "../controllers/userController.js";

import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router()

router.post("/", registrar)

router.get("/profile", checkAuth, perfil)
router.get("/confirmar/:token", confirmar)
router.post("/login", autenticar)

router.post("/password", olvidePassword)
router.get("/password/:token", comprobarToken)
router.post("/password/:token", nuevoPassword)
router.post('/eliminar-token/:token', eliminarToken);

router.post('/recibir-correo', recibirCorreo);

export default router