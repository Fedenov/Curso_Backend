// FILE SYSTEM
const fileSys = require('fs')

// Operaciones sincronicas con file system

//escritura
fileSys.writeFileSync('./PruebaFileSystem.txt', 'Soy La Escritura')
//si el archivo no existe, lo va a crear

//lectura
const lectura = fileSys.readFileSync('./PruebaFileSystem.txt', 'utf-8')
//el "./" indica que se busque el archivo a partir de la carpeta en la 
//que estamos ubicados actualmente. UTF-8 se usa para indicar en que
//lenguaje se muestra el mensaje leido
console.log(lectura)

//actualizar archivos
fileSys.appendFileSync('./PruebaFileSystem.txt', ' - Soy La Actualizacion')
console.log(fileSys.readFileSync('./PruebaFileSystem.txt', 'utf-8'))

//escribir arrays (hay que cambiarlos a strings)
const personas = [{nombre: "Juan", apellido: "Carlos"}, {nombre: "Chupa", apellido: "Pija"}]
fileSys.writeFileSync('./PruebaFileSystem.txt', JSON.stringify(personas))
//devolver string a array
let personasArchivo = JSON.parse(fileSys.readFileSync('./PruebaFileSystem.txt', 'utf-8'))
console.log(typeof personasArchivo)
console.log(personasArchivo[0])
console.log(fileSys.readFileSync('./PruebaFileSystem.txt', 'utf-8'))

//borrar archivo
fileSys.unlinkSync('./PruebaFileSystem.txt')

// Try-Catch
try{
    console.log(fileSys.readFileSync('./PruebaFileSystem.ttxt', 'utf-8'))
}catch(error) {
    console.log(`Hubo un error: ${error}`)
}

// Fecha y Hora
const fechaYHora = new Date()
console.log(fechaYHora)



// FILE SYSTEM CON CALLBACKS (ASINCRONOS - NO BLOQUEANTES)

fileSys.readFile('./Prueba.txt', 'utf-8', (error, resultado) => {
    if (error){
        console.log(`Hubo un error ${error}`)
    } else {
        console.log(resultado)
    }
})

fileSys.writeFile('./Prueba.txt', 'Soy FILE Prueba', error => {
    if (error){
        console.log(`Hubo un error ${error}`)
    } else {
        console.log("Archivo escrito con exito")
    }
})

fileSys.appendFile('./Prueba.txt', ' - Soy un append', error => {
    if (error){
        console.log(`Hubo un error ${error}`)
    } else {
        console.log("Archivo actualizado con exito")
    }
})

// CREAR CARPETA
fileSys.mkdir('./carpeta', error => {
    if (error){
        console.log(`Hubo un error ${error}`)
    } else {
        console.log("Carpeta creada con exito")
    }
})

// Leer contenido de carpeta
fileSys.readdir('./', (error, resultado) => {
    if (error){
        console.log(`Hubo un error en readdir ${error}`)
    } else {
        console.log(`La carpeta contiene:`)
        console.log(resultado)
    }
})


// FILE SYSTEM ASINCRONO VIA PROMESAS

const fs = require('fs')

const escribir = async () => {
    try{
        await fs.promises.writeFile('./Prueba.txt', 'SOY PRUEBA')
        console.log('OK')
    } catch(error) {
        console.log(`Hubo error: ${error}`)
    }
}
// con el await puesto antes se le da la orden de bloqueante. Que espere
//a que la linea de codigo termine de ejecutarse y luego sigue al proximo
escribir()


//Leo el archivo con try/catch
function leerTC(){
    fs.promises.readFile('/Prueba.txt', 'utf-8')
    .then( contenido => {
        console.log(contenido)
    })
    .catch( err => {
        //hubo error, no pudo leerlo, hacer algo
        console.log('Error de lectura!', err)
    })
}
leerTC()

//Leo el archivo usando sintaxis async/await
async function leerAA(){
    try {
        const contenido = await fs.promises.readFile('./Prueba.txt', 'utf-8')
        console.log(contenido)
    }
    catch (err) { 
        // hubo error
        console.log('Error de lectura!', err)
    }
}
leerAA()