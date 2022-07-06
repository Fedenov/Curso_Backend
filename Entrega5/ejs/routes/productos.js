const { Router } = require("express");
const router = Router();
const productos = [
    {
        title: "Castillo Medieval",
        price: 1500000,
        thumbnail:
            "https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Castle-128.png",
        id: 1,
    },
    {
        title: "Para que Pedro pique mas piedras",
        price: 50630,
        thumbnail:
            "https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Medusa-128.png",
        id: 2,
    },
    {
        title: "Las notas de Satan (SALE)",
        price: 666,
        thumbnail:
            "https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Spell_Book-128.png",
        id: 3,
    },
    {
        title: "Fuego control",
        price: 7022006880,
        thumbnail:
            "https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Destructive_Magic-128.png",
        id: 4,
    },
];

router.get("/", (req, res) => {
    try {
        res.render("listado", { productos });
    } catch (error) {
        console.log(
            "error al intentar obtener el listado de productos :: ",
            error
        );
    }
});

router.post("/", (req, res) => {
    try {
        const { title, price, thumbnail } = req.body;
        let ultimo = productos.length - 1;
        let id = productos[ultimo].id + 1;
        productos.push({
            id,
            title,
            price,
            thumbnail,
        });
        res.redirect("/");
    } catch (error) {
        console.log("error al postear", error);
        res.sendStatus(500);
    }
});

router.get("/:id", (req, res) => {
    try {
        let encontrado = productos.find(
            (producto) => producto.id == req.params.id
        );
        encontrado
            ? res.json(encontrado)
            : res.json({ error: "No existe ese ID" });
    } catch (error) {
        console.log("ocurrio un error desde el metodo GET por id, ", error);
    }
});

module.exports = router;
