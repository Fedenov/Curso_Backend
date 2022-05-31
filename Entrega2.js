class Contenedor {
    constructor(nombreArchivo){
        const fs = require("fs")
        this.archivo = nombreArchivo
        this.ruta = `./${nombreArchivo}.txt`
        console.log(this.ruta)
        fs.writeFileSync(this.ruta, "")
    }
    async save(newObjeto){
        const fs = require("fs")
        let info = await fs.promises.readFile(this.ruta, 'utf8')
        if (info){
            info = JSON.parse(info)
            newObjeto.ID = info.length + 1
            info.push(newObjeto)
            await fs.promises.writeFile(this.ruta, JSON.stringify(info))
            console.log("positivo")
        } else {
            newObjeto.ID = 1
            const obj = [newObjeto]
            await fs.promises.writeFile(this.ruta, JSON.stringify(obj))
            console.log("negativo")
        }
        /*let newID = lastID++
        console.log(newID)
        const objeto = [{ID: newID, objeto: newObjeto}]
        fs.appendFileSync(this.ruta, `${JSON.stringify(objeto)}\n`)*/
        return newObjeto.ID
        return(`ID: ${lastID+1}`)
    }
}

let contenedor = new Contenedor("PruebaContenedor")
/*console.log(contenedor.save("32"))
console.log(contenedor.save("40"))*/

contenedor.save({objeto: "shampoo"}).then(ID => {
    console.log(ID)
    contenedor.save({objeto: "acond"}).then(ID2 => console.log(ID2))
})