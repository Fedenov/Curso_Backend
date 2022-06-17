const { Router } = require("express");
const router = Router();
const { appendFile } = require("fs");

const productos = [
    {
        title: "Test nombre",
        price: "Test precio",
        thumbnail: "alguna url",
        id: 1,
    },
];

router.use((req, res, next) => {
    req.target = "llego el ruteo";
    next();
});

router.get("/home", (req, res) => {
    //no hace falta poner /api/home porque ya esta aclarado en Notas_Clase8
    res.send("Estas en home");
    console.log(req.target);
});

router.get("/api/productos", (req, res) => {
    res.json(productos);
});

router.get("/api/productos/:id", (req, res) => {
    let encontrado = productos.find((producto) => producto.id == req.params.id);
    let resultado;
    if (encontrado) {
        resultado = encontrado;
    } else {
        resultado = { error: "El producto no existe" };
    }
    res.json(resultado);
});

router.post("/api/productos", (req, res) => {
    const { title, price, thumbnail } = req.body;
    if (!title || !price || !thumbnail) {
        return next("Hay campos incompletos");
    } else {
        nextId = productos.length + 1;
        productos.push({ title, price, thumbnail, nextId });
        res.json(productos[productos.length - 1]);
    }
});

router.put("/api/productos/:id", (req, res) => {
    let resultado;
    const indiceEncontrado = productos.findIndex((producto) => {
        return producto.id == req.params.id;
    });
    if (!title || !price || !thumbnail) {
        return next("Hay campos incompletos");
    } else if (indiceEncontrado === -1) {
        resultado = { error: "El producto no existe" };
    } else {
        productos[indiceEncontrado] = req.body;
        resultado = "Producto actualizado con exito";
    }
    res.json(resultado);
});

router.delete("/api/productos/:id", (req, res) => {
    const indiceEncontrado = productos.findIndex((producto) => {
        return producto.id == req.params.id;
    });
    let resultado = "";
    if (indiceEncontrado === -1) {
        resultado = { error: "El producto no existe" };
    } else {
        productos.splice(indiceEncontrado, 1);
        resultado = "Producto eliminado con éxito";
    }
    res.json(resultado);
});

module.export = router;
