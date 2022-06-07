class Contenedor {
  constructor(nombreArchivo) {
    const fs = require("fs");
    this.archivo = nombreArchivo;
    this.ruta = `./${nombreArchivo}.txt`;
    console.log(this.ruta);
    fs.writeFileSync(this.ruta, "");
  }
  async save(newObjeto) {
    const fs = require("fs");
    let infoElements = "";
    await fs.readFile(this.ruta, "utf8", function (error, content) {
      infoElements = JSON.parse(content);
    });

    if ((await infoElements) === "") {
      let producto = { ...newObjeto, Id: 1 };
      await fs.promises.writeFile(this.ruta, JSON.stringify(producto));
    } else {
      let lastId = infoElements[infoElements.lenght - 1].Id;
      let producto = { ...newObjeto, Id: lastId + 1 };
      infoElements.push(producto);
      await fs.promises.writeFile(this.ruta, JSON.stringify(infoElements));
    }
    /*let newID = lastID++
          console.log(newID)
          const objeto = [{ID: newID, objeto: newObjeto}]
          fs.appendFileSync(this.ruta, `${JSON.stringify(objeto)}\n`)*/
    return newObjeto.Id;
    return `ID: ${lastID + 1}`;
  }
}

let contenedor = new Contenedor("Tienda_Inglesa");
/*console.log(contenedor.save("32"))
  console.log(contenedor.save("40"))*/

let chocolateKitKat = {
  title: "Chocolate KIT KAT 41.5 gr",
  price: 59.0,
  thumbnail:
    "https://images-ti-vm1.tiendainglesa.com.uy/large/P348506-1.jpg?20180827101634,Chocolate-KIT-KAT-41.5-gr-en-Tienda-Inglesa",
};
let maniConChocolate = {
  title: "Maní con Chocolate TIENDA INGLESA 100 gr",
  price: 64.0,
  thumbnail:
    "https://images-ti-vm1.tiendainglesa.com.uy/large/P034948-1.jpg?20220425093012,Mani-con-Chocolate-TIENDA-INGLESA-100-gr-en-Tienda-Inglesa",
};

async function start() {
  await contenedor.save(chocolateKitKat);
  await contenedor.save(maniConChocolate);
}

start();
