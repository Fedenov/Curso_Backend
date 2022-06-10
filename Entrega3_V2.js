const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async getAll() {
    try {
      const data = JSON.parse(
        await fs.promises.readFile(this.archivo, "utf-8")
      );
      return data ? data : "Archivo vacío o con problemas";
    } catch (error) {
      console.log("Error buscando objetos del archivo. Code: ", error);
    }
  }
  async getById(id) {
    try {
      const lista = await fs.promises.readFile("./productos.txt", "utf-8");
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

const productosFile = new Contenedor("./productos.txt");

const express = require("express");
const app = express();
const puerto = 8080;

app.listen(puerto, (err) => {
  if (!err) {
    console.log(`Servidor iniciado en el puerto ${puerto}`);
  } else {
    console.log(`Error al iniciar el servidor: `, err);
  }
});

app.get("/", (req, res) => {
  console.log("entro en home");
  res.send("<h1 style=color:blue>Federico</h1>");
});

app.get("/productos", (req, res) => {
  console.log("entro en productos");
  const productos = productosFile.getAll();
  productos.then((productos) => res.json(productos));
});

app.get("/productoRandom", async (req, res) => {
  try {
    const contenido = productosFile.getAll();
    console.log(`Leyo bien el contenido: ${contenido}`);
    res.send("okey");
  } catch (err) {
    console.log(`error en lectura: ${err}`);
    res.send("not okey");
  }
});

app.get("/productosRandom", (req, res) => {
  console.log("entro en productos");
  const productos = productosFile.getAll();
  productos.then((productos) => {
    const random = Math.floor(Math.random() * productos.length);
    const util = require("util");
    console.log(util.inspect(productos, false, null, true));
    const prodList = util.inspect(productos, false, null, true);
    console.log(`Random Index: ${random}`);
    console.log(`ProdList: ${prodList}`);
    productosFile.getById(random + 1).then((objetoRandom) => {
      console.log(objetoRandom);
      res.json(objetoRandom);
    });
  });
});
