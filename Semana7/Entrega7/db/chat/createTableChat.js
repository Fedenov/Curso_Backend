const db = require("../database");

const createChatsTable = async () => {
    try {
        await db.sqliteConnection.schema.createTable("chats", (chat) => {
            chat.increments("id").primary();
            chat.string("email").notNullable();
            chat.string("message").notNullable();
            chat.string("time").notNullable();
        });
        console.log("Se genero una nueva tabla de chats");
    } catch (error) {
        console.log(error);
    }
};
module.exports = createChatsTable;
