import { cloneObj, findObj } from "../lib/util.js";
import Dao from "./Dao.js";

class MemoryDao extends Dao {
    constructor() {
        super();
        this.listaItems = [];
    }

    async save(newItem) {
        let id = 0;
        this.listaItems.forEach((element) => {
            if (element.id > id) id = element.id;
        });
        id++;

        newItem.id = id;
        newItem.timestamp = +new Date();

        this.listaItems.push(cloneObj(newItem));

        return id;
    }

    indexOf(idBuscado) {
        for (let i = 0; i < this.listaItems.length; i++) {
            if (this.listaItems[i].id == idBuscado) return i;
        }
        return -1;
    }

    async getById(idBuscado) {
        let index = this.indexOf(idBuscado);
        if (index >= 0) {
            return cloneObj(this.listaItems[index]);
        }
        return null;
    }

    async find(obj) {
        return findObj(obj, this.listaItems);
    }

    async getAll() {
        return cloneObj(this.listaItems);
    }

    async deleteById(idBuscado) {
        let index = this.indexOf(idBuscado);
        if (index >= 0) {
            let itemEliminado = this.listaItems[index];
            this.listaItems.splice(index, 1);
            return itemEliminado;
        } else {
            return null;
        }
    }

    async deleteAll() {
        this.listaItems = [];
    }

    async updateById(idBuscado, itemActualizado) {
        let index = this.indexOf(idBuscado);
        if (index >= 0) {
            itemActualizado.id = this.listaItems[index].id;
            itemActualizado.timestamp = this.listaItems[index].timestamp;
            this.listaItems[index] = cloneObj(itemActualizado);
            return itemActualizado;
        } else {
            return null;
        }
    }
    async disconnect() {}
}

export default MemoryDao;
