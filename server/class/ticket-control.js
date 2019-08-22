const fs = require('fs'); // libreria para gudardar archivos

class Ticket { // clase que crea archivos
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl { // clase que lleva el control de los archivos
    constructor() {

        this.ultimo = 0; // numero del ultimo tikcet
        this.hoy = new Date().getDate(); // fehca del dia
        this.data = require('../data/data.json'); // datos guardados en el archivo json que espesifica la ruta en el require
        this.tickets = []; // array para tickets
        this.ultimosCuatro = []; // array para ultimos 4 tickets

        if (this.hoy === this.data.hoy) { // comprobacion de que dia es y si es diferente al actual reincia el sistema

            this.ultimo = this.data.ultimo; // guarda todo en el archivo json mienetras el dia se el mismo en el archivo que el dia actual
            this.tickets = this.data.tickets;
            this.ultimosCuatro = this.data.ultimosCuatro;

        } else {
            this.reinciarConteo();
        }

    }

    reinciarConteo() { // reinicia todos los parametros o variables del objeto reiniciando el sistema cuando cambia el dia 

        this.ultimo = 0;

        this.tickets = [];

        this.ultimosCuatro = [];

        this.grabarArchivo();

    }

    siguiente() { // Metodo que hace que el ticket cambie de valo 0,1,2,3,4 etc...

        this.ultimo += 1; // inclementa el numero del ultimo ticket

        let tikect = new Ticket(this.ultimo, null); // crea un nuevo objeto ticket

        this.tickets.push(tikect); // inserta el nuevo objeto en el array tickets

        this.grabarArchivo(); // grava el archivo con el nuevo ticket
        return `Ticket ${this.ultimo}`
    }

    getUltimoTicket() { // obtiene el ultimo numero de ticket
        return `Ticket ${this.ultimo}`
    }

    getUltimos4() { // obtiene el array de los ultimos tickets
        return this.ultimosCuatro;
    }

    atenderTicket(escritorio) { // metodo para atender los tickets uno a uno 
        if (this.tickets.length === 0) { // si el array de tickets esta basio no hay tickets por atender
            return 'no hay tikects';
        }

        let numeroTicket = this.tickets[0].numero; // obtiene el numero del primer ticket dentro del array
        this.tickets.shift(); // borra ese mismo ticket para eliminarlo

        let atenderTicket = new Ticket(numeroTicket, escritorio); // crea un nuevo toicket y le proporciona el escritorio donde sera atendido
        // aquir si aguarda el ticket viejo por que compraten espacio en memoria con el numero ticket
        this.ultimosCuatro.unshift(atenderTicket); // mete ese nuevo ticket con escritorio en el array donde se ecunetran los ultimos 4 tickets o primeros para ser atendidos

        if (this.ultimosCuatro.length > 4) { // si el array tiene 4 tickets y atienden a otro
            this.ultimosCuatro.splice(-1, 1); // se borra el ultimo cuando es atendido
        }

        console.log(this.ultimosCuatro);

        this.grabarArchivo(); //  gurada el archivo

        return atenderTicket;
    }

    grabarArchivo() { // metodo para guardar el archivo

        let jsonData = { // archivo que tiene los nuevos datos y los aguarda dentro del objeto json
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro
        }


        let dataJsonString = JSON.stringify(jsonData); // conversion de json a string para ser guardado
        fs.writeFileSync('./server/data/data.json', dataJsonString); // funcion que aguarda el string lo convierte en json y lo aguarda

    }
}

module.exports = { TicketControl };