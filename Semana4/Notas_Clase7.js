const express = require("express");
const app = express();
const puerto = 8080;
const productos = [{}, {}, {}];
let frase = "Frase Inicial";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(puerto, (err) => {
    if (err) {
        console.log(`Hubo un error al iniciar el servidor ${err}`);
    } else {
        console.log(`Servidor escuchando el puerto: ${puerto}`);
    }
});

app.get("/api/suma/:num1/:num2", (req, res) => {
    const response = Number(req.params.num1) + Number(req.params.num2);
    res.json(response);
});

app.get("/api/suma", (req, res) => {
    const { num1, num2 } = req.query;
    const response = Number(num1) + Number(num2);
    res.json(response);
});

app.get("/api/operacion/:op", (req, res) => {
    const oeracion = req.params.op.split("");
    switch (operacion[1]) {
        case "+":
            res.json(Number(operacion[0]) + Number(operacion[2]));
            break;
        case "-":
            res.json(Number(operacion[0]) - Number(operacion[2]));
            break;
        default:
            res.send("Mandaste mal la info");
            break;
    }
});

app.get("/api/frase/:pos", (req, res) => {
    const { pos } = req.params;
    const fraseArray = frase.split(" ");
    const response = fraseArray[pos - 1];
    res.send({ buscada: response });
});

app.get("/api/frase/:pos", (req, res) => {
    const { palabra } = req.body;
    let fraseArray = frase.split(" ");
    const anterior = fraseArray[Number(req.params.pos)];
    fraseArray[Number(req.params.pos)] = palabra;
    res.json({ actualizada: palabra, anterior });
});

app.delete("/api/frase/:pos", (req, res) => {
    const posicion = Number(req.params.pos) - 1;
    let fraseArray = frase.split(" ");
    fraseArray[posicion] = "";
    res.sendStatus(200);
});

app.post("/api/frase", (req, res) => {
    const { palabra } = req.body;
    const fraseArray = frase.split(" ");
    fraseArray.push(palabra);
    frase = fraseArray.join(" ");
    res.send({ agregada: palabra, pos: fraseArray.indexOf(palabra) });
});

app.get("/api/productos", (req, res) => {
    res.send(productos);
});

app.post("/api/productos", (req, res) => {
    productos.push(nuevoProducto);
    res.send(productos);
});

app.get("/api/productos/:id", (req, res) => {
    res.send(producto);
    res.sendStatus(201);
});

app.get("/api/productos/:id", (req, res) => {
    const { id } = req.params;
    const id2 = req.params.id; // igual a la sentencia anterior
    const product = productos.filter((productos) => {
        return producto.id === Number(id); // Transformo el id a un numero
    });
    res.status.apply(200).json(product);
});

app.get("/api/productos", (req, res) => {
    const { titulo } = req.query;
    if (titulo) {
        const product = productos.filter((producto) => {
            return producto.title.toLowerCase() === titulo.toLowerCase();
        });
        res.status(200).json(product);
        return; //porque aunque el res deberia funcionar como un return
        // eso no sucede entonces hay que forzar a que corte el server con
        // un return. Queda como abierto el puerto y no corre el res.json de abajo
    }
    res.json(productos);
});

app.get("/api/productos/:id", (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: "El parametro no es un numero" });
        return;
    }
    const product = productos.filter((producto) => {
        return producto.id === id;
    });
    if (!product.length) {
        res.status(404).send({ error: "El contenido que solicito no existe" });
        return;
    }
    res.status(200).json(product);
});
