import { Server } from "socket.io";
import { agregarMensaje, obtenerMensaje } from "./DAOS/chat.dao.js";

const socket = (expressServer) => {
  const io = new Server(expressServer);

  io.on("connection", async (socket) => {
    console.log("Se conecto un usuario nuevo", socket.id);

    let arrayMsj = await obtenerMensaje();
    socket.emit("server:msgs", arrayMsj);

    socket.on("client:msg", async (msgInfo) => {
      await agregarMensaje(msgInfo);
      let arrayMsj = await obtenerMensaje();
      socket.emit("server:msgs", arrayMsj);
    });
  });
};

export default socket;
