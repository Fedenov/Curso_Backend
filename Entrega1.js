class Usuario {
    constructor(nombre, apellido,libros,mascotas){
      this.nombre = nombre;
      this.apellido = apellido;
      this.libros = libros;
      this.mascotas = mascotas;
    }
  getFullName(){
    return `${this.nombre} ${this.apellido}`
  }
  addMascota(mascota){
    this.mascotas.push(mascota)
  }
  countmascota (){
     return this.mascotas.length
      
    }
  addbook(nombre,autor){
    this.libros.push({"nombre": nombre, "autor": autor})
  }
    getBookNames(){
      return this.libros.map(libros => libros)
    
                             
    }
  }
  let mascotas =[]
  let libros = []
    const persona = new Usuario("Sebastian", "Musso", mascotas , libros)
  
   
   persona.addMascota("perro")
   persona.addMascota("gato")
  // persona.addMascota("Pajaro")
  
  persona.addbook("La biblia", "Jesus")
  persona.addbook("Fundacion", "Isac")
  
  console.log(persona.getFullName())
  console.log(persona.countmascota())
  console.log(persona.getBookNames())