const APIproductos = require("./APIproductos");
const { Router } = require("express");
const router = Router();

const API = new APIproductos();

API.save({
    title: "Test nombre",
    price: 2,
    thumbnail: "alguna url",
});

router.get("/", (req, res) => {
    res.json(API.getAll());
});

router.get("/:id", (req, res) => {
    res.json(API.getById(Number(req.params.id)));
});

router.post("/", (req, res) => {
    res.json(API.save(req.body));
});

router.put("/:id", (req, res) => {
    res.json(API.saveById(Number(req.params.id), req.body));
});

router.delete("/:id", (req, res) => {
    res.json(API.deleteById(Number(req.params.id)));
});

module.exports = router;
