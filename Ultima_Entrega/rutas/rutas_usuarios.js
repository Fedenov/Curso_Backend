import { Router } from "express";
import userController from "../controlador/controlador_usuarios";
import { auth } from "../principal/servicios";
const router = Router();

router.get("/cerrar_sesion", auth, userController.logOut);
router.get("/panel", auth, userController.adminPanel);
router.get("/registro", (req, res) => {
    res.render("registro");
});
router.get("/error_ingreso", (req, res) => {
    res.render("error_ingreso");
});

export default router;
