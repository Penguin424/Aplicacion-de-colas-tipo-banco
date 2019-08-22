const { io } = require('../server'); // io es lo que nos proporciona la connecion con el frontend
const { TicketControl } = require('../class/ticket-control');

const tiketControl = new TicketControl();


io.on('connection', (client) => {
    client.on('siguienteTickect', (data, call) => {
        let siguiente = tiketControl.siguiente();
        console.log(siguiente);

        call(siguiente); // manda el callback

    });

    client.emit('estadoAtual', { estado: tiketControl.getUltimoTicket(), ultimos4: tiketControl.getUltimos4() });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                message: 'el escritorio es obligatorio'
            });
        }

        let atenderTicket = tiketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        console.log(data.escritorio);
    });

    client.broadcast.emit('ultimos4', { ultimos4: tiketControl.getUltimos4() });
});