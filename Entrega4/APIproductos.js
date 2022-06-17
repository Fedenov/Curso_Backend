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
        objeto.id = APIproductos.idCount;
        this.productos.push(objeto);
        APIproductos.idCount++;
        return objeto;
        //const nextId = this.productos.length + 1;
        //this.productos.push({ title, price, thumbnail, nextId });
        // const nextId = APIproductos.idCount++;
        // newTitulo = objeto.title;
        // newPrice = objeto.price;
        // newURL = objeto.thumbnail;
        // this.productos.push({ newTitulo, newPrice, newURL, nextId });
        // return this.productos[this.productos.length];
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
