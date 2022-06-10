const express = require("express");
const app = express();
const puerto = 8080;
let visitas = 0;
let visitasWARE = 0;

// MIDDLEWARE
app.use((req, res, next) => {
  visitasWARE++;
  //   if (rol) {
  //     next();
  //   } else {
  //     res.send({ errorCode: 401, message: "No hay permiso de acceso" });
  //   }
  next();
});

app.get("/httptest", (req, res) => {
  res.send('<h1 style="color: blue">Bienvenido al servidor de express</h1>');
});

app.get("/user", (req, res) => {
  res.send("Hola soy home");
});

// MIDDLEWARE
app.use((req, res, next) => {
  console.log("Yendo a visitas");
  next();
});

app.get("/visitas", (req, res) => {
  visitas++;
  res.send(`El servidor tuvo ${visitas} visitas y ${visitasWARE} visitasWARE`);
});

app.get("/jsontest", (req, res) => {
  const date2 = new Date();
  res.json({ fyh: date2 });
});

app.get("/user/:id/:nombre", (req, res) => {
  const ID = req.params.id;
  const { id, nombre } = req.params;
  console.log(req.params);
  res.send(`Hola soy user ${id} o ${ID} con nombre ${nombre}`);
});

app.listen(puerto, (error) => {
  if (!error) {
    console.log(`El servidor se inicio en el puerto ${puerto}`);
  } else {
    console.log(`Error al inicial el servidor: ${error}`);
  }
});
