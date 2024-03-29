import { orderDao } from "../DAOS/orders.dao.js";
import { sendMail } from "../services.js";
import { cartDao } from "../DAOS/cart.dao.js";

const sendOrder = async (req, res) => {
    const nueva_orden = {
        nro: Date.now(),
        user: req.session.passport.user,
        prod: req.body,
    };

    const orden = await orderDao.newOrder(nueva_orden);

    sendMail(
        process.env.MAIL,
        "Nuevo pedido",
        `Pedido nro ${nueva_orden.nro} con contenido: ${nueva_orden.prod.prueb}`
    );

    const empty = await cartDao.empty_cart(req, res);

    res.render("info", {
        msj: `Orden enviada con el numero ${nueva_orden.nro}`,
    });
};

export default {
    sendOrder,
};
