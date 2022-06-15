const express = require("express");
const app = express();
const puerto = 8080;
const rutas = require("./gestorRutas");
const rutas2 = require("./gestorRutas2");

// Configuracion para acceder al body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuracion para enviar imagenes y archivos estaticos
app.use(express.static("imagenes"));
// aca genero antes un prefijo virtual. Para acceder primero poner /html y luego /(nombre del archivo)
app.use("/html", express.static("html"));
// para algo fuera de localhost, poner la ruta absoluta. Se agrega antes __dirname para tener toda la ruta hasta el servidor
app.use("/html", express.static(__dirname + "html"));

// Direccionamiento de entradas a gestorRutas.js para que las responda
app.use("/api", rutas);

app.use("/api2", rutas2);

app.use(notificacion);

app.listen(puerto, () => {
    console.log(`Servidor escuchando al puerto ${puerto}`);
});

app.use((error, req, res, next) => {
    if (error) {
        console.log(error);
        res.sendStatus(500);
    } else if (error.message) {
        console.log(error.message);
        res.status(error.statusCode).send(error.message);
    }
});
