import Koa from "koa";
import koaBody from "koa-body";
import router from "./routes/index.js";
import mongoose from "mongoose";

const app = new Koa();

mongoose.connect(
    "mongodb+srv://FedeNov:coderhouse@cluster0.guxcgw2.mongodb.net/?retryWrites=true&w=majority"
);

app.use(koaBody());

app.use(router.routes());

app.use((ctx) => {
    ctx.response.status = 404;
    ctx.body = {
        status: "No se ha encontrado",
        message: "Ruta no encontrada",
    };
});

app.listen(3000);
console.log("Escuchando al puerto 3000");
