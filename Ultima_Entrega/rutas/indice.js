import { Router } from "express";
import productRoutes from "./rutas_productos.js";
import cartRoutes from "./cart.routes.js";
import userRoutes from "./rutas_usuarios.js";
import orderRoutes from "./rutas_ordenes.js";

let router = Router();

//index
router.get("/", (req, res) => {
    res.redirect("/products");
});

//Routing
router.use("/products", productRoutes);
router.use("/carrito", cartRoutes);
router.use("/users", userRoutes);
router.get("/chat", (req, res) => res.redirect("/chat.html"));

router.get("/error", (req, res) => {
    res.render("error", { data: "error" });
});

router.use("/orders", orderRoutes);

router.get("*", (req, res) => {
    res.render("error", { data: "Error 404 not found" });
});

export default router;
