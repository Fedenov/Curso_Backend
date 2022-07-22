// db.usuario.insertMany([{nombre: 'Jeronimo', apellido: 'Perez', edad: 28}, 
// {nombre: 'Manuela', apellido: 'Correa', edad: 20}, 
// {nombre: 'Emanuel', apellido: 'Martinez', edad: 23}, {nombre: 'Pedro', apellido: 'Melini', edad: 65}, 
// {nombre: 'Julieta', apellido: 'Martinez', edad: 30}, {nombre: 'Rocio', apellido: 'Perez', edad: 32},{nombre: 'Antonio', apellido: 'Melini', edad: 35},{nombre: 'Luca', apellido: 'Fornillo', edad: 28},{nombre: 'Lucas', apellido: 'Palermo', edad: 30},{nombre: 'Jose', apellido: 'Fernandez', edad: 28},
// {nombre: 'Valentina', apellido: 'Perez', edad: 31}])

// //Ejercicio

// db.articulo.insertMany([{nombre: 'Lapiz', precio: 40, stock: 32},{nombre: 'Antonio', precio: 400, stock: 32},])

// ObjectId("62d63143fd195991deb06f37").getTimestamp()


// db.usuario.find({apellido: {$not:{$eq:'Perez'}}})
// db.usuario.find({apellido:{$eq:'Perez'}})

// db.usuario.distinct("nombre")


// db.usuario.find({},{"nombre":1, _id:0})  // nombre y cero de id de esa manera no molesta con id


// // sort y limit 

// db.usuario.find().sort({nombre:1}) // orden

// db.usuario.find().limit(2).skip(0)

// db.usuario.find().limit(10).skip(1)

// db.usuario.update({nombre:"Rocio"}, {$set: {nombre:"Julia"}}) ///cambia Rocio a la juli


// /// use admin to create usuario y contrase;a


