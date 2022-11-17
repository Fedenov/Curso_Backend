import { Router } from "express";
import orderController from "../controlador/orders.controller.js";
const router = Router()

router
.route('/send')
.post(orderController.sendOrder)





export default router