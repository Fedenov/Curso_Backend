const express = require("express");
const app = express();
const path = require("path");
const { Server: IOServer } = require("socket.io");
const expressServer = app.listen(8080, () =>
    console.log(`escuchando en puerto 8080`)
);
const io = new IOServer(expressServer);

const fs = require("fs");
const { Router } = require("express");
const router = Router();
const arrayMsj = [];

const Contenedor = require("./class.js");
let chat = new Contenedor();

const products = [
    {
        title: "Castillo Medieval",
        price: 1500000,
        thumbnail:
            "https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Castle-128.png",
        id: 1,
    },
    {
        title: "Para que Pedro pique mas piedras",
        price: 50630,
        thumbnail:
            "https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Medusa-128.png",
        id: 2,
    },
    {
        title: "Las notas de Satan (SALE)",
        price: 666,
        thumbnail:
            "https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Spell_Book-128.png",
        id: 3,
    },
    {
        title: "Fuego control",
        price: 7022006880,
        thumbnail:
            "https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Destructive_Magic-128.png",
        id: 4,
    },
];

app.use(express.static(path.join(__dirname, "./public")));

io.on("connection", async (socket) => {
    console.log("Hi Stranger:", socket.id);
    socket.emit("server:products", products);

    socket.on("client:product", async (product) => {
        products.push(product);
        io.emit("server:product", product);
    });

    socket.emit("server:msgs", arrayMsj);
    socket.on("client:msg", (msgInfo) => {
        arrayMsj.push(msgInfo);
        chat.save(msgInfo);
        io.emit("server:msgs", arrayMsj);
    });

    socket.on("cliente:typing", (typeValue) => {
        socket.broadcast.emit("server:typing", typeValue);
    });
});
