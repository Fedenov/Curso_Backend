import { order_model } from "../modelos.js";

const newOrder = async (orden) => {
    const newOrder = await order_model.create(orden)
}

export const orderDao = {
    newOrder
}