let socket = io();
let label = $('small');



let searchParam = new URLSearchParams(window.location.search); // obtiene el parametro desaso de la toolbar

if (!searchParam.has('escritorio')) { // si no existe el parametro escritorio te devuelve al index.html a que lo generes
    window.location = 'index.html'
    throw new Error('El escritorio es necesario');
}

let escritorio = searchParam.get('escritorio');
console.log(escritorio);

$('h1').text(`Escritorio: ${escritorio}`);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio }, (res) => { // cuando precionas el boton manda el numero de escritorio que se aguarda en el toolbar
        // manda un mensaje con el numero de escritorio y recibe el call back de la funcion escuchando en el servidor con el nnumero del ticket y los ultimos 4
        if (res.numero === undefined) {
            label.text('No hay tickets');
        } else {
            label.text(`ticket: ${res.numero}`);

        }


    });
});