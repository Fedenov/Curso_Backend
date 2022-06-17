class APIproductos {
    constructor() {
        this.productos = [];
    }
    static idCount = 1;

    getAll() {
        return this.productos;
    }

    getById(id) {
        const objeto = this.productos.find((producto) => producto.id === id);
        return objeto
            ? objeto
            : { error: `No se encontró el producto con ID ${id}` };
    }

    save(objeto) {
        //objeto.id = APIproductos.idCount;
        //const nextId = this.productos.length + 1;
        //this.productos.push({ title, price, thumbnail, nextId });
        //this.productos.push(objeto);
        APIproductos.idCount++;
        const nextId = idCount;
        this.productos.push({ title, price, thumbnail, nextId });
        return objeto;
    }

    saveById(id, objeto) {
        const index = this.productos.findIndex(
            (producto) => producto.id === id
        );
        if (index != -1) {
            objeto.id = id;
            this.productos[index] = objeto;
            return this.productos[index];
        } else {
            return { error: `No se encontró el producto con ID ${id}` };
        }
    }

    deleteById(id) {
        const index = this.productos.findIndex(
            (producto) => producto.id === id
        );
        if (index != -1) {
            this.productos.splice(index, 1);
            return { success: `Producto con ID ${id} eliminado` };
        } else {
            return { error: `No se encontró el producto con ID ${id}` };
        }
    }
}

module.exports = APIproductos;
