const fs = require("fs");

class Contenedor {
  constructor(fileName) {
    this.fileName = fileName;
    fs.promises.writeFile(`./${fileName}`, "");
  }
  async save(objeto) {
    let data = await fs.promises.readFile(`./${this.fileName}`, "utf-8");
    if (!data) {
      objeto.id = 1;
      const arr = [objeto];
      await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(arr));
      return objeto.id;
    } else {
      data = JSON.parse(data);
      objeto.id = data.length + 1;
      data.push(objeto);
      await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(data));
      return objeto.id;
    }
  }
  async getById(id) {
    let productos = JSON.parse(
      await fs.promises.readFile("./productos.txt", "utf-8")
    );
    let objeto = productos.find((prod) => prod.id == id);
    console.log(objeto ? objeto : "ese ID no existe");
  }
  async getAll() {
    let productos = JSON.parse(
      await fs.promises.readFile("./productos.txt", "utf-8")
    );
    console.log(productos);
  }
  async deleteById(id) {
    let productos = JSON.parse(
      await fs.promises.readFile("./productos.txt", "utf-8")
    );
    if (productos.some((prod) => prod.id == id)) {
      let newProductos = productos.filter((prod) => prod.id != id);
      await fs.promises.writeFile(
        `./${this.archivo}`,
        JSON.stringify(newProductos)
      );
      console.log("El producto ha sido eliminado");
    } else {
      console.log("No existe producto ID ingresado");
    }
  }
  async deleteAll() {
    await fs.promises.writeFile(`./${this.archivo}`, "[]");
    console.log("Todos los archivos han sido eliminados");
  }
}

const productos = new Contenedor("productos");
productos.save({ name: "Lapicera" }).then((ID) => {
  console.log(ID);
  productos.save({ name: "Regla" }).then((ID2) => console.log(ID2));
  productos.getById(1);
});
