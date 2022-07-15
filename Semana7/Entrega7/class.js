const fs = require("fs");

class Contenedor {
    constructor() {}

    async save(message) {
        try {
            const msj = `Fecha y Hora: ${message.time}, Nombre de usuario: ${message.username}, Mensaje: ${message.message}\n`;
            await fs.promises.appendFile(`./chathistory.txt`, msj);
            console.log("> You're GO for launch Huston <");
        } catch (error) {
            console.log(`Hubo un error al guardar el mensaje: ${error}`);
        }
    }

    async getAll() {
        let listadoMsg = JSON.parse(
            await fs.promises.readFile(`./${this.archivo}.txt`, "utf-8")
        );
        console.log("Mensajes: ", listadoMsg);
        return listadoMsg;
    }
}

module.exports = Contenedor;
