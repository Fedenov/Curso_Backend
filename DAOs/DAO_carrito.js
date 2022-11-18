import { modelo_carritos, modelo_productos } from "../modelos.js";

const agregarCarrito = async (req, res) => {
    const carritoActual = await modelo_carritos.findOne({
        user_id: req.session.passport.user,
    });
    const producto = await modelo_productos.findOne({ _id: req.params.id });
    if (carritoActual) {
        carritoActual.products.push(req.params.id);
        await carritoActual.save();
        return producto;
    } else {
        const nuevoCarrito = new modelo_carritos({
            user_id: req.session.passport.user,
            products: req.params.id,
        });
        await nuevoCarrito.save();
        return producto;
    }
};

const obtenerCarrito = async (id) => {
    const carritoUser = await modelo_carritos.find({ user_id: id });
    return carritoUser;
};

const eliminarProductoDeCarrito = async (req, res) => {
    let carrito = await modelo_carritos.findById(req.params.cartId);
    let indice = carrito.products.findIndex((p) => p._id == req.params.prodId);
    carrito.products.splice(indice, 1);
    let carritoActualizado = await modelo_carritos.updateOne(
        { _id: req.params.cartId },
        { $set: { productos: carrito.productos } }
    );
};

const vaciarCarrito = async (req, res) => {
    const carrito = await modelo_carritos.findOne({
        user_id: req.session.passport.user,
    });
    const vacio = await modelo_carritos.updateOne(
        { _id: carrito.id },
        { $set: { productos: [] } }
    );
};

export const cartDao = {
    agregarCarrito,
    obtenerCarrito,
    eliminarProductoDeCarrito,
    vaciarCarrito,
};
