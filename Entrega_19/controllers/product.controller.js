import products_model from "../models/product.model.js";

const getProductById = async (ctx) => {
    const { id } = ctx.params;
    console.log(id);
    const currentProduct = await products_model.findById(id);

    if (currentProduct) {
        ctx.body = {
            status: "Succes",
            data: currentProduct,
        };
    } else {
        ctx.response.status = 404;
        ctx.body = {
            status: "No se ha encontrado",
            message: `No se ha encontrado el producto con ID: ${id}`,
        };
    }
};

const createProduct = async (ctx) => {
    try {
        const {
            product_name,
            product_description,
            product_price,
            product_imgUrl,
            product_stock,
        } = ctx.request.body;

        const createdProduct = await products_model.create({
            product_name,
            product_description,
            product_price,
            product_imgUrl,
            product_stock,
        });

        ctx.response.status = 201;
        ctx.body = {
            status: "Creación exitosa",
            data: createdProduct,
        };
    } catch (error) {
        console.log("No se ha podido crear el producto. Error:", error);
    }
};

const updateProduct = async (ctx) => {
    try {
        const {
            product_name,
            product_description,
            product_price,
            product_imgUrl,
            product_stock,
        } = ctx.request.body;

        const { id } = ctx.params;

        const updatedProduct = await products_model.updateOne(
            { _id: id },
            {
                $set: {
                    product_name,
                    product_description,
                    product_price,
                    product_imgUrl,
                    product_stock,
                },
            }
        );

        ctx.response.status = 201;
        ctx.body = {
            status: "Actualización exitosa",
            data: {
                product_name,
                product_description,
                product_price,
                product_imgUrl,
                product_stock,
            },
        };
    } catch (error) {
        console.log("No se ha podido actualizar el producto. Error:", error);
    }
};

const deleteProduct = async (ctx) => {
    const { id } = ctx.params;
    const deletedProduct = await products_model.deleteOne({ _id: id });

    ctx.response.status = 200;
    ctx.body = {
        status: "Eliminación exitosa",
        data: deletedProduct,
    };
};

const getAllProducts = async (ctx) => {
    const products = await products_model.find();

    ctx.response.status = 200;
    ctx.body = {
        status: "Exitoso",
        data: products,
    };
};

export default {
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
};
