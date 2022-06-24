const { Router } = require("express");
const router = Router();
const productos = require("./products");

router.get("/", (req, res) => {
    res.render("index");
});

router.use("/productos", productos);

module.exports = router;
