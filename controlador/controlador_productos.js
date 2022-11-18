import { DAOproducto } from "../DAOs/DAO_productos.js";

const obtenerProductos = async (req, res) => {
    if (req.user) {
        const lista_productos = await DAOproducto.obtenerProducto();
        res.render("index", {
            data: req.user,
            products: lista_productos,
        });
    } else {
        res.render("index", {
            data: undefined,
            products: undefined,
        });
    }
};

const cargarProducto = async (req, res) => {
    await DAOproducto.load_p(req, res);
    res.render("info", { msj: "Producto agregado!" });
};

const actualizarPanel = async (req, res) => {
    const lista_productos = await DAOproducto.obtenerProducto();
    res.render("actualizarProducto", { data: lista_productos });
};

const actualizarProducto = async (req, res) => {
    await DAOproducto.actualizarProducto(req, res);
    res.render("info", { msj: "Producto modificado!" });
};

const eliminarProducto = async (req, res) => {
    await DAOproducto.del_prod(req, res);
    res.render("info", { msj: "Producto eliminado" });
};

export default {
    obtenerProductos,
    cargarProducto,
    actualizarProducto,
    actualizarPanel,
    eliminarProducto,
};
