const { io } = require('../server'); // io es lo que nos proporciona la connecion con el frontend
const { TicketControl } = require('../class/ticket-control'); // clase para llevar el control de los tickets

const tiketControl = new TicketControl(); // objeto para acceder a sus metodos


io.on('connection', (client) => { // hace la coneccion con el front end
    client.on('siguienteTickect', (data, call) => { // el parametro client es todo lo que hace el cliente en el frontend
        let siguiente = tiketControl.siguiente(); // hace un nuevo ticket
        console.log(siguiente);

        call(siguiente); // manda el callback con el nuevo ticket

    });

    // emit manda un mensaje con el ultimo ticket y e los ultmos 4 para ser mostrados
    client.emit('estadoAtual', { estado: tiketControl.getUltimoTicket(), ultimos4: tiketControl.getUltimos4() });

    client.on('atenderTicket', (data, callback) => { // escucha el socket atenderTicket
        if (!data.escritorio) { // si el escritroio no es mandado manda un error por medio del call back de la funcion emit del forntend
            return callback({
                err: true,
                message: 'el escritorio es obligatorio'
            });
        }

        let atenderTicket = tiketControl.atenderTicket(data.escritorio); // agrega un escritorio al ticket

        callback(atenderTicket); // regresa el ticket y el escritorio

        console.log(data.escritorio);
    });

    client.broadcast.emit('ultimos4', { ultimos4: tiketControl.getUltimos4() }); // regresa los ultimos 4 tickcets para la pantalla publiva para que todos los usuarios lo vean  
});