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
        // this.libros = function(nomb, aut){
        //     [].push.apply({"nombre": nomb, "autor": aut})
        // }
        this.libros.push({"nombre": nomb, "autor": aut});
    }
    getBookNames(){
        // var names = []
        // for (let i = 0; i < this.libros.length; i++){
        //     names.push((this.libros.find(x => Object.keys(x)[i] === "nombre") || {})["nombre"])
        // }
        // this.libros.forEach(function(obj){
            // a.push(obj.name);
        // })
        // return names
        var titulos = this.libros.map(function (el) { return el.nombre; });
        return titulos
        //return Object.keys(this.libros).forEach((nombre) => {console.log(this.libros[nombre])})
        // Object.values = this.libros => Object.keys(this.libros).map("nombres" => this.libros["nombres"])
        // return Object.values
        // return (this.libros.find(x => Object.keys(x) === "nombre") || {})["nombre"]
        // return this.libros.map(nombresLibros)
        // function nombresLibros(){
        //     return this.libros.nombre
        // }                              
    }
}

// Crear objeto con parametros iniciales
let usuario = new Usuario("Federico", "Novelli", {"nombre": "Zero To One", "autor": "Peter Thiel"}, "Timon")

// Invocar metodo getFullName
console.log("Nombre del usuario:", usuario.getFullName()) // Devuelve lo pedido por el metodo dentro de una frase para que se identique a que pertenece el nombre

// Invocar metodo addMascota
usuario.addMascota("Kiwi")
console.log("Se ha agregado \"", usuario.mascotas[usuario.mascotas.length - 1], "\" a su lista de mascotas") // Mensaje de confirmacion de que se agrego el elemento
// Chequeo si se agrego la mascota:
//console.log(usuario.mascotas)

// Invocar metodo countMascotas
console.log("Usted tiene:", usuario.countMascotas(), "mascotas") // Devuelve lo pedido por el metodo dentro de una frase para que se identique a que pertenece el numero

// Invocar metodo addBook
usuario.addBook("Ignition!", "John D. Clark")
usuario.addBook("Algo", "Alguien")
console.log("Se ha agregado: \n\"", usuario.libros[usuario.libros.length - 1].nombre, "de", usuario.libros[usuario.libros.length - 1].autor, "\"\na su lista de libros") // Mensaje de confirmacion de que se agrego el elemento
// Chequeo si se agrego el libro:
console.log(usuario.libros)

// Invocar metodo getBookNames
console.log("Usted tiene los siguientes libros:\n",usuario.getBookNames())




// let mascotas =[]
// let libros = []
// const persona = new Usuario("Sebastian", "Musso", mascotas , libros)
   
// persona.addMascota("perro")
// persona.addMascota("gato")
// // persona.addMascota("Pajaro")
  
// persona.addBook("La biblia", "Jesus")
// persona.addBook("Fundacion", "Isac")
  
// console.log(persona.getFullName())
// console.log(persona.countMascotas())
// console.log(persona.getBookNames())