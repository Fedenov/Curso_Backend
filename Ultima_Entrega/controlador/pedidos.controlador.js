import { orderDao } from '../DAOs/pedidos.dao.js'
import { sendMail } from '../services.js'
import { cartDao } from '../DAOs/carrito.dao.js'

const shipQuest = async (req, res) => {
        const nuevo_pedido = {
            nro : Date.now(),
            user : req.session.passport.user,
            prod: req.body
        }    
        const orden = await orderDao.newOrder(nuevo_pedido)  
        sendMail(process.env.MAIL, "Nuevo pedido", `Pedido nro ${nuevo_pedido.nro} con contenido: ${nueva_orden.prod.prueb}`)
        const vaciado = await cartDao.empty_cart(req, res)
        res.render('info', {msj: `Pedido nro ${nueva_orden.nro} ha sido enviada`})
}

export default {
    shipQuest
}