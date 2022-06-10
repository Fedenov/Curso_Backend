const fs = require("fs");
const express = require("express");
const app = express();
const puerto = 8080;

class Contenedor {
    constructor(archivo) {
        this.archivo = `./${archivo}.txt`;
    }

    async getAll() {
        try {
            const data = JSON.parse(
                await fs.promises.readFile(this.archivo, "utf-8")
            );
            return data ? data : "Archivo vacío o con problemas";
        } catch (error) {
            console.log("Error buscando objetos del archivo. ErrMssg: ", error);
        }
    }
    async getById(id) {
        try {
            const lista = await fs.promises.readFile(this.archivo, "utf-8");
            let data = JSON.parse(lista);
            let arrays = data.find((contenido) => contenido.id == id);
            if (arrays) {
                return arrays;
            } else {
                return null;
            }
        } catch (err) {
            console.log(`no entro en el get by try`);
        }
    }
}

const productosFile = new Contenedor("productos");

app.listen(puerto, (err) => {
    if (!err) {
        console.log(`Servidor iniciado en el puerto ${puerto}`);
    } else {
        console.log(`Error al iniciar el servidor: `, err);
    }
});

app.get("/", (req, res) => {
    console.log("entro en home");
    res.send("Bienvenido a la Entrega 3");
});

app.get("/productos", (req, res) => {
    console.log("entro en productos");
    const productos = productosFile.getAll();
    productos.then((productos) => res.json(productos));
});

app.get("/productoRandom", (req, res) => {
    console.log("entro en productos");
    const productos = productosFile.getAll();
    productos.then((productos) => {
        const random = Math.floor(Math.random() * productos.length);
        const util = require("util");
        const prodList = util.inspect(productos, false, null, true);
        console.log(`ProdList: ${prodList}`);
        console.log(`Random Index: ${random}`);
        productosFile.getById(random + 1).then((objetoRandom) => {
            console.log(objetoRandom);
            res.json(objetoRandom);
        });
    });
});
