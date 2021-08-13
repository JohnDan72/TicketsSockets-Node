const TicketContol = require("../models/ticket-control");

const ticketControl = new TicketContol();


const socketController = (socket) => {
    // console.log(`Cliente conectado con id: ${socket.id}`);
    socket.emit("ultimo-ticket", `Último ticket: ${ticketControl.ultimo}`);
    socket.emit("estado-actual", ticketControl.ultimos4);
    socket.emit("tickets-cola", ticketControl.tickets.length);
    socket.on('disconnect', () => {
        // console.log(`Cliente desconectado con id: ${socket.id}`);
    });

    socket.on('siguiente-ticket', ( payload , callback ) => {
        const siguiente = ticketControl.siguiente();
        callback( siguiente );
        socket.broadcast.emit("tickets-cola", ticketControl.tickets.length);
        // socket.broadcast().emit('notifica-ticket-nuevo',siguiente);
    });

    // atender ticket
    socket.on('atender-ticket', ( { escritorio } , callback ) => {
        if(!escritorio){
            return callback({
                success: false,
                error_msg: 'Error en el escritorio'
            });
        }
        const resp = ticketControl.atenderTicket( escritorio );
        //no existe el ticket
        if(!resp){
            return callback({
                success: false,
                error_msg: 'Ya no hay más tickets en cola'
            });
        }
        socket.broadcast.emit("estado-actual", ticketControl.ultimos4);
        socket.broadcast.emit("tickets-cola", ticketControl.tickets.length);
        socket.emit("tickets-cola", ticketControl.tickets.length);
        callback({
            success: true,
            ticket: resp
        } );
    });
}

module.exports = {
    socketController
}