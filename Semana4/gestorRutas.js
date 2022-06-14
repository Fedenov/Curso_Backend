//Archivo de rutas que maneja solicitudes que llegan al codigo de Notas_Clase8

const { Router } = require("express");
const { appendFile } = require("fs");
const router = Router();

const personas = [];
const usuarios = [];

router.get("/home", (req, res) => {
    //no hace falta poner /api/home porque ya esta aclarado en Notas_Clase8
    res.send("Estas en home");
});

router.get("/user", (req, res) => {
    res.send("Estas en user");
});

router.get("/personas", (req, res) => {
    res.json(personas);
});

router.post("/personas", (req, res) => {
    const { nombre, apellido, edad } = req.body;
    personas.push({ nombre, apellido, edad });
    res.sendStatus(201);
});

router.post("/usuario", (req, res) => {
    const { nombre, edad } = req.body;
    usuarios.push({ nombre, edad });
    res.sendStatus(201);
});

// Hay que exportar una funcion en vez de un objeto. Entonces exportamos router
// Esto tiene que ir a lo ultimo
module.exports = router; // Si se quiere exportar otra funcion, pongo otre func donde dice router
