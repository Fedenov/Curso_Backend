const socket = io();

function renderProducts(producto) {
    fetch("/plantilla1.hbs").then((response) => {
        response.text().then((plantilla) => {
            productos.forEach((producto) => {
                const template = Handlebars.compile(plantilla);
                const html = template(producto);
                document.querySelector("#productos").innerHTML = html;
            });
        });
    });
}

socket.on("server:productos", (productos) => {
    productos(productos);
});

// console.log("Ingresado");
// renderProducts({ titulo: "Lapiz", thumbnail: "google.com", price: 123 });
