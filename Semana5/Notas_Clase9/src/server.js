const express = require("express");
const app = express();

app.use(express.static("public"));

app.listen(8080, () => {
    console.log("Servidor escuchando el puerto 8080");
});
