import { productRepository, chatRepository } from "./repositories/index.js";
import logger from "./lib/logger.js";
import { normalizar } from "./lib/util.js";
import { io } from "./global.js";

function socketConfig() {
    io.on("connection", async (socket) => {
        socket.emit("productos", await productRepository.getById());

        const chatMessages = await chatRepository.getById();
        const normalized = await normalizar(chatMessages);
        socket.emit("mensajes", normalized);

        socket.on("mensaje", async (mensaje) => {
            try {
                await chatRepository.create(mensaje);
            } catch (error) {
                logger.error("Error guardando mensaje de chat=", error);
            }
            const chatMessages = await chatRepository.getById();
            const normalized = await normalizar(chatMessages);
            io.sockets.emit("mensajes", normalized);
        });
    });
}

export { socketConfig };
