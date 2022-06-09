const express = require("express");
const fs = require("fs");
const app = express();
const puerto = 8080;

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async getAll() {
    let productos = JSON.parse(
      await fs.promises.readFile("./productos.txt", "utf-8")
    );
    console.log(productos);
  }
}

app.listen(puerto, () => {
  console.log(`El servidor se inicio en el puerto ${puerto}`);
});

app.get("/", async (req, res) => {
  res.send("Hola Soy Sebastian");
});

app.get("/productos", async (req, res) => {
  let productos = await new Contenedor("productos.txt").getAll();

  res.send(
    (title = productos.map((productos) => {
      return productos.title;
    }))
  );
});

app.get("/productoRandom", async (req, res) => {
  let productos = await new Contenedor("productos.txt").getAll();

  let random = Math.floor(Math.random() * productos.length);

  res.send(
    `<img src='${productos[random].thumbnail}' style="width: 100px" /><br>${productos[random].title}, <br> Precio:$ ${productos[random].price}`
  );
});
