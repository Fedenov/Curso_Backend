import { DAOorden } from "../DAOs/DAOPedidos.js";
import { mandarMensaje } from "../services.js";
import { DAOcarrito } from "../DAOs/DAO_carrito.js";

const shipQuest = async (req, res) => {
    const nuevo_pedido = {
        nro: Date.now(),
        user: req.session.passport.user,
        prod: req.body,
    };
    const orden = await DAOorden.newOrder(nuevo_pedido);
    mandarMensaje(
        process.env.MAIL,
        "Nuevo pedido",
        `Pedido nro ${nuevo_pedido.nro} con contenido: ${nueva_orden.prod.prueb}`
    );
    const vaciado = await DAOcarrito.empty_cart(req, res);
    res.render("info", {
        msj: `Pedido nro ${nueva_orden.nro} ha sido enviada`,
    });
};

export default {
    shipQuest,
};
