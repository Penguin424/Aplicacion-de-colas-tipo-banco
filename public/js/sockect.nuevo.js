let socket = io();
let etiqueta = $('#lblNuevoTicket');

socket.on('connect', () => {
    console.log('conectado con el servidor');
});

socket.on('disconnect', () => {
    console.log('desconectado del servidor');
});

$('button').on('click', function() {
    socket.emit('siguienteTickect', null, (tikect) => {
        etiqueta.text(tikect); //Recibe el callback
    });
});

socket.on('estadoAtual', (data) => {
    etiqueta.text(data.estado);
});