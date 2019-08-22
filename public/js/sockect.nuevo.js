let socket = io();
let etiqueta = $('#lblNuevoTicket');

socket.on('connect', () => {
    console.log('conectado con el servidor');
});

socket.on('disconnect', () => {
    console.log('desconectado del servidor');
});

$('button').on('click', function() {
    socket.emit('siguienteTickect', null, (tikect) => { // cuando precionas el boton recibe el call back para actualizar la pantalla con el proximo ticket
        etiqueta.text(tikect); //Recibe el callback
    });
});

socket.on('estadoAtual', (data) => {
    etiqueta.text(data.estado); // escucha el estado actual de ultimo ticket generado para guardarlo en la pantalla y que no se pierda cuando salgas de la app
});