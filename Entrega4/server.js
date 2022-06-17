const express = require("express");
const app = express();
const puerto = 8080;
const ruta0 = require("./APIproductos");
const rutas = require("./productos");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(puerto, (err) => {
    if (err) {
        console.log(`Hubo un error al iniciar el servidor. Error: ${err}`);
    } else {
        console.log(`Servidor escuchando el puerto: ${puerto}`);
    }
});

app.use("/", express.static(__dirname + "/publico"));
app.use(express.static("publico"));
app.use("/api", ruta0);
app.use("/api/productos", rutas);

app.use((error, req, res, next) => {
    if (error) {
        console.log(error);
        res.sendStatus(500);
    } else if (error.message) {
        console.log(error.message);
        res.status(error.statusCode).send(error.message);
    }
});
