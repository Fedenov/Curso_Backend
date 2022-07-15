const db = require("../database");

const createProductsTable = async () => {
    try {
        await db.mysqlConnection.schema.createTable("products", (product) => {
            product.increments("id").primary();
            product.string("title").notNullable();
            product.string("description").notNullable();
            product.string("thumbnail").notNullable();
            product.integer("price").notNullable();
            product.integer("stock").notNullable();
        });
        console.log("Se genero una nueva tabla de productos");
    } catch (error) {
        console.log(error);
    }
};

module.exports = createProductsTable;
