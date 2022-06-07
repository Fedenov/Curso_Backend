/*
let arr = [];
while(arr.length < 1000){
    let r = ((Math.random() * (20 - 0) * 100) / 100).toFixed(2);
    if(arr.length < 1000) arr.push(r);
}
console.log(arr);
*/

// Hecho por el profe. NUMEROS ALEATORIOS
const objeto = {};
for (let i = 0; i <= 10000; i++) {
  const numeroAleatorio = Math.floor(Math.random() * (20 - 1 + 1) + 1);
  if (objeto[numeroAleatorio]) {
    objeto[numeroAleatorio] += 1;
  } else {
    objeto[numeroAleatorio] = 1;
  }
}
console.log(objeto);

// Aceder a propiedad mediante corchetes
const persona1 = { nombre: "Pepe" };
const titulo = "nombre";
console.log((persona1.nombre = persona1["nombre"] = persona1[titulo]));

const productos = [
  { id: 1, nombre: "Escuadra", precio: 323.45 },
  { id: 2, nombre: "Calculadora", precio: 234.56 },
  { id: 3, nombre: "Globo Terráqueo", precio: 45.67 },
  { id: 4, nombre: "Paleta Pintura", precio: 456.78 },
  { id: 5, nombre: "Reloj", precio: 67.89 },
  { id: 6, nombre: "Agenda", precio: 78.9 },
];

const nombresProductos = [];
let precioTotal = 0;
let menorPrecio = productos[0].precio;
let mayorPrecio = 0;

productos.map((producto) => {
  nombresProductos.push(producto.nombre);
  precioTotal += producto.precio;
  if (producto.precio > mayorPrecio.precio) mayorPrecio = producto;
  if (producto.precio < menorPrecio.precio) menorPrecio = producto;
});

const objetoMostrar = {
  NombresProductos: nombresProductos.join(", "),
  precioTotal: precioTotal.toFixed(2),
  menorPrecio: menorPrecio,
  mayorPrecio: mayorPrecio,
  precioPromedio: (precioTotal / 6).toFixed(2),
};

console.log(`
    Nombre de los productos> ${objetoMostrar.nombresProductos}
    Valor total: ${objetoMostrar.precioTotal}
    Producto de menor oprecio: ${objetoMostrar.menorPrecio.nombre}
    Producto de mayor precio: ${objetoMostrar.mayorPrecio.nombre}
    Precio promedio: ${objetoMostrar.precioPromedio}
`);

var moment = require("moment");
/*
function añosDiaNacimiento(fecha) {
   return moment(fecha, "YYYYMMDD").fromNow();
}
console.log(añosDiaNacimiento("19940725"))*/

console.log(`
    Hoy es: ${moment().format("DD/MM/YYYY")}
    Naci el dia: ${moment("1994-11-28")}.format('DD/MM/YYY')}
    Desde mi nacimiento pasaron: ${moment().diff("1994-11-28", "years")} años
    Desde mi nacimiento pasaron: ${moment().diff("1994-11-28", "days")} dias
`);
