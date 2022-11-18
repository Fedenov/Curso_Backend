import { DAOcarrito } from "../DAOs/DAO_carrito.js";
import { DAOproductos } from "../DAOs/DAO_productos";

const obtenerCarrito = async (req, res) => {
    const carrito = await DAOcarrito.getUserCart(req.session.passport.user);
    console.log("log", carrito);
    if (carrito[0]) {
        const products = await productDao.getSomeProducts(carrito[0].products);
        res.render("carrito", {
            data: req.user,
            productos: productos,
            carrito: carrito[0].id,
        });
    } else {
        res.render("error", {
            data: "Añade algun producto",
        });
    }
};

const añadirCarrito = async (req, res) => {
    const producto = await DAOcarrito.añadirCarrito(req, res);
    res.render("Se ha añadido", { producto }, "al carrito");
};

const eliminarProducto = async (req, res) => {
    const carrito = await DAOcarrito.eliminarProductoDeCarrito(req, res);
    res.render("info", { msj: "Se ha eliminado el producto" });
};

export default {
    obtenerCarrito,
    añadirCarrito,
    eliminarProducto,
};
