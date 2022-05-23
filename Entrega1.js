class Usuario {
    constructor(nombre, apellido,libros,mascotas){
      this.nombre = nombre;
      this.apellido = apellido;
      this.libros = [libros];
      this.mascotas = [mascotas];
    }
    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }
    addMascota(mascota){
        this.mascotas.push(mascota);
    }
    countMascotas(){
        return this.mascotas.length
    }
    addBook(nomb,aut){
        this.libros.push({"nombre": nomb, "autor": aut});
    }
    getBookNames(){
        var titulos = this.libros.map(function (el) { return el.nombre; });
        return titulos                       
    }
}

// Crear objeto con parametros iniciales
let usuario = new Usuario("Federico", "Novelli", {"nombre": "Zero To One", "autor": "Peter Thiel"}, "Timon")

// Invocar metodo getFullName
console.log("\nNombre del usuario:", usuario.getFullName()) // Devuelve lo pedido por el metodo dentro de una frase para que se identique a que pertenece el nombre

// Invocar metodo addMascota
usuario.addMascota("Kiwi")
console.log("\nSe ha agregado \"", usuario.mascotas[usuario.mascotas.length - 1], "\" a su lista de mascotas.") // Mensaje de confirmacion de que se agrego el elemento

// Invocar metodo countMascotas
console.log("\nUsted tiene:", usuario.countMascotas(), "mascotas.") // Devuelve lo pedido por el metodo dentro de una frase para que se identique a que pertenece el numero

// Invocar metodo addBook
usuario.addBook("Ignition!", "John D. Clark")
console.log("\nSe ha agregado: \n\"", usuario.libros[usuario.libros.length - 1].nombre, "de", usuario.libros[usuario.libros.length - 1].autor, "\"\na su lista de libros.") // Mensaje de confirmacion de que se agrego el elemento

// Invocar metodo getBookNames
console.log("\nUsted tiene los siguientes libros:\n",usuario.getBookNames())