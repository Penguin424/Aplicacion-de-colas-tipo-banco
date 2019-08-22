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
    actualizarHtml(res.ultimos4);
});

socket.on('ultimos4', (res) => {
    let audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizarHtml(res.ultimos4);
})

const actualizarHtml = (ultimos4) => {
    for (let i = 0; i <= ultimos4.length - 1; i++) {
        ticketslb[i].text(`Ticket ${ultimos4[i].numero}`);
        escritoioslb[i].text(`escritorio ${ultimos4[i].escritorio}`);
    }
}