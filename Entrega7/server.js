const puerto = 8080;
const express = require("express");
const app = express();
const rutas = require("./routes/index.js");
const path = require("path");
const { engine } = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const ProdAPI = require("./src/APIproductos");
const MessAPI = require("./src/APImensajes");
const messagesDB = require("./src/db/database").sqliteConnection;
const productsDB = require("./src/db/database").mysqlConnection;

const httpServer = new HttpServer(app);
const ioServer = new IOServer(httpServer);
const productsApi = new ProdAPI(productsDB, "productos");
const products = productsApi.getAllProducts();
const messagesApi = new MessAPI(messagesDB, "chats");

app.use(express.static("public"));
app.use("/", rutas);

app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: path.join(__dirname, "./views/layout/main.hbs"),
        layoutsDir: path.join(__dirname, "./views/layout"),
        partialsDir: path.join(__dirname, "./views/partials"),
    })
);

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "hbs");

app.listen(puerto, () => {
    console.log(`El servidor está escuchando el puerto: ${puerto}`);
});

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
