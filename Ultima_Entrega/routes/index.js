import { Router } from "express";
import productRoutes from "./products.routes.js";
import cartRoutes from "./cart.routes.js";
import userRoutes from "./users.routes.js";
import orderRoutes from "./orders.routes.js";

let router = Router();

router.get("/", (req, res) => {
    res.redirect("/products");
});

router.use("/products", productRoutes);
router.use("/carrito", cartRoutes);
router.use("/users", userRoutes);
router.get("/chat", (req, res) => res.redirect("/chat.html"));

router.get("/error", (req, res) => {
    res.render("error", { data: "error" });
});

router.use("/orders", orderRoutes);

router.get("*", (req, res) => {
    res.render("error", { data: "Error #404" });
});

export default router;
