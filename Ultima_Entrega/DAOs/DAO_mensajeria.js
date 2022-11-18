import { chat_model } from "../modelos.js";

const agregarMensaje = async (msg) => {
    const message = await chat_model.create(msg)
}

const obtenerMensaje = async () => {
    const messages = await chat_model.find()
    return messages
}

export {
    agregarMensaje,
    obtenerMensaje
}