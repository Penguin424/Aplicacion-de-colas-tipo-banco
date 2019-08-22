let socket = io();

let lbTicket1 = $('#lblTicket1');
let lbTicket2 = $('#lblTicket2');
let lbTicket3 = $('#lblTicket3');
let lbTicket4 = $('#lblTicket4');

let lbEscritorio1 = $('#lblEscritorio1');
let lbEscritorio2 = $('#lblEscritorio2');
let lbEscritorio3 = $('#lblEscritorio3');
let lbEscritorio4 = $('#lblEscritorio4');

let ticketslb = [lbTicket1, lbTicket2, lbTicket3, lbTicket4];
let escritoioslb = [lbEscritorio1, lbEscritorio2, lbEscritorio3, lbEscritorio4];

socket.on('estadoAtual', (res) => {
    actualizarHtml(res.ultimos4); // este es el estado acual para que cuando se actualize nunca este borrado o cuando te salgas de la pagina
});

socket.on('ultimos4', (res) => {
    let audio = new Audio('audio/new-ticket.mp3'); // funcion que agrega el audio cada vez que se acualiza la pantalla publica
    audio.play();
    actualizarHtml(res.ultimos4); // cambia el estado de los ultimos 4 tickets para todos en la pantalla publica
})

const actualizarHtml = (ultimos4) => { // funcion que agrega el ticket correspondiente con el lugar a donde tiene que estar dentro de los ticket (labels) y los escritorios (parrafos)
    for (let i = 0; i <= ultimos4.length - 1; i++) {
        ticketslb[i].text(`Ticket ${ultimos4[i].numero}`);
        escritoioslb[i].text(`escritorio ${ultimos4[i].escritorio}`);
    }
}