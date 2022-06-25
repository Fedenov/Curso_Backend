const express = require("express");
const app = express();
const rutas = require("./routes/index");
const path = require("path");
const fs = require("fs");

app.use(express.static("public"));

// defino el motor de plantilla
app.engine("ntl", function (filePath, options, callback) {
    fs.readFile(filePath, function (err, content) {
        if (err) {
            return callback(new Error(err));
        }
        const rendered = content
            .toString()
            .replace("&&title&&", "" + options.title + "")
            .replace("&&message&&", "" + options.message + "");
        return callback(null, rendered);
    });
});

app.set("view engine", "ntl");
app.set("views", path.join(__dirname, "./views"));
app.use("/", rutas);

app.listen(8080, () => {
    console.log("Servidor escuchando el puerto 8080");
});
