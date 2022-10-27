import mongoose from "mongoose";

const products_schema = new mongoose.Schema({
    product_name: String,
    product_description: String,
    product_price: Number,
    product_imgUrl: String,
    product_stock: Number,
    id: String,
});

const products_model = mongoose.model("Productos:", products_schema);

export default products_model;
