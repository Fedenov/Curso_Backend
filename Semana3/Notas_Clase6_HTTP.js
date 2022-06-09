const http = require("http");
const puerto = 8080; //Siempre elegir mas del puerto 3000 para que no este reservado

const server = http.createServer((req, res) => {
  console.log("Llego una peticion");
  //res.end("Bienvenido a nuestro servidor http");
  const tiempo = new Date();

  const hora = tiempo.getHours();
  console.log("Hora: ", hora);

  if (hora >= 6 && hora <= 12) {
    res.end("Buenos dias");
  } else if (hora >= 13 && hora <= 19) {
    res.end("Buenas tardes");
  } else {
    res.end("Buenas noches");
  }
});

server.listen(puerto, () => {
  console.log(`Servidor escuchando puerto: ${puerto}`);
});
