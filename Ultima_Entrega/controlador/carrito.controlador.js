import { cartDao } from "../DAOs/carrito.dao.js";
import { productDao } from "../DAOs/productos.dao.js";

const obtenerCarrito = async (req, res) => {
    const cart = await cartDao.getUserCart(req.session.passport.user)
    console.log('log', cart)
    if (carrito[0]) {
        const products =  await productDao.getSomeProducts(cart[0].products)
        res.render('carrito', {
            data: req.user,
            products: products,
            cart: cart[0].id
        })
    } else {
        res.render('error', {
            data: 'Añade algun producto'
        })
    }
}

const añadirCarrito = async (req, res) => {
    const producto = await cartDao.añadirCarrito(req, res)
    res.render('Se ha añadido', {producto},'al carrito')
}

const eliminarProducto = async (req, res) => {
    const carrito = await cartDao.eliminarProductoDeCarrito(req, res)
    res.render('info', {msj: "Se ha eliminado el producto"})
}

export default {
    obtenerCarrito,
    añadirCarrito,
    eliminarProducto
}