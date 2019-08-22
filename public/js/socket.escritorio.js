let socket = io();
let label = $('small');



let searchParam = new URLSearchParams(window.location.search);

if (!searchParam.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('El escritorio es necesario');
}

let escritorio = searchParam.get('escritorio');
console.log(escritorio);

$('h1').text(`Escritorio: ${escritorio}`);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio }, (res) => {

        if (res.numero === undefined) {
            label.text('No hay tickets');
        } else {
            label.text(`ticket: ${res.numero}`);

        }


    });
});