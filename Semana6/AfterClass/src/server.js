const express = require("express");
const app = express();
const path = require("path");
const { Server: IOServer } = require("socket.io");
const expressServer = app.listen(8080, () => console.log("Ta bien"));
const io = new IOServer(expressServer);
const productos = [
    { titulo: "Lapiz", thumbnail: "google.com", price: 123 },
    { titulo: "Lapiz", thumbnail: "google.com", price: 123 },
];

app.use(express.static(path.join(__dirname, "../public")));

io.on("connection", (socket) => {
    socket.emit("server:productos", productos);

    console.log("Se conecto un cliente");
});
