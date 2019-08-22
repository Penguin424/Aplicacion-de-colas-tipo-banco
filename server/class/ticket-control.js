const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.data = require('../data/data.json');
        this.tickets = [];
        this.ultimosCuatro = [];

        if (this.hoy === this.data.hoy) {

            this.ultimo = this.data.ultimo;
            this.tickets = this.data.tickets;
            this.ultimosCuatro = this.data.ultimosCuatro;

        } else {
            this.reinciarConteo();
        }

    }

    reinciarConteo() {

        this.ultimo = 0;

        this.tickets = [];

        this.ultimosCuatro = [];

        this.grabarArchivo();

    }

    siguiente() {

        this.ultimo += 1;

        let tikect = new Ticket(this.ultimo, null);

        this.tickets.push(tikect);

        this.grabarArchivo();
        return `Ticket ${this.ultimo}`
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`
    }

    getUltimos4() {
        return this.ultimosCuatro;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'no hay tikects';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimosCuatro.unshift(atenderTicket);

        if (this.ultimosCuatro.length > 4) {
            this.ultimosCuatro.splice(-1, 1);
        }

        console.log(this.ultimosCuatro);

        this.grabarArchivo();

        return atenderTicket;
    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro
        }


        let dataJsonString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', dataJsonString);

    }
}

module.exports = { TicketControl };