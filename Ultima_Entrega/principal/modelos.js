import mongoose from "mongoose";

const schema = new mongoose.Schema({
    password: String,
    username: String,
    firstName: String,
    lastName: String,
    avatar: String,
    admin: Boolean,
});

const cart_schema = new mongoose.Schema({
    user_id: String,
    products: Array,
});

const products_schema = new mongoose.Schema({
    nombre_producto: String,
    product_description: String,
    product_price: Number,
    product_imgUrl: String,
    product_stock: Number,
});

const chat_schema = new mongoose.Schema({
    author: {
        email: { type: String, required: true },
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        alias: { type: String, required: true },
    },
    text: { type: String, required: true },
    fechahora: { type: String, required: true },
});

const orders_schema = new mongoose.Schema({
    nro: Number,
    user: String,
    prod: Array,
});

const modelo = mongoose.model("Usuario", schema);
const modelo_carritos = mongoose.model("Carritos", cart_schema);
const modelo_productos = mongoose.model("Productos", products_schema);
const modelo_mensajeria = mongoose.model("Mensajeria", chat_schema);
const modelo_pedidos = mongoose.model("Pedidos", orders_schema);

export {
    modelo,
    modelo_carritos,
    modelo_productos,
    modelo_mensajeria,
    modelo_pedidos,
};
