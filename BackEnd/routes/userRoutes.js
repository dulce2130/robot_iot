import express from "express";
import { registrar, perfil, confirmar, autenticar, 
    comprobarToken, eliminarToken } from "../controllers/userController.js";

import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router()

router.post("/", registrar)

router.get("/perfil", checkAuth, perfil)
router.get("/confirmar/:token", confirmar)
router.post("/login", autenticar)

router.get("/password/:token", comprobarToken)


export default router