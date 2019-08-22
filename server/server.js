const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const app = express();

const port = process.env.PORT || 3000; // varibale para el puerto que correra el servidor
const publicPath = path.resolve(__dirname, '../public'); //variable para hacer que el servidor abra la carpeta public al entrar al dominio
let server = http.createServer(app); // configuracion de servidor para despliege de sockets



app.use(express.static(publicPath)); // despligue de la caprta public 

// COMUNICACION DEL BACKEND CON EL FRONTEND
module.exports.io = socketIO(server);
require('./sockets/socket'); // Requerimiento de los sockets para ser ejecutados





//Levantamiento del servidor
server.listen(port, (err) => {

    if (err) throw new Error(err);
    console.log(`Servidor conrriendo en el puerto ${port}`);

})