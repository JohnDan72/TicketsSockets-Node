const TicketContol = require("../models/ticket-control");

const ticketControl = new TicketContol();


const socketController = (socket) => {
    // console.log(`Cliente conectado con id: ${socket.id}`);
    socket.emit("ultimo-ticket", `Último ticket: ${ticketControl.ultimo}`);
    socket.on('disconnect', () => {
        // console.log(`Cliente desconectado con id: ${socket.id}`);
    });

    socket.on('siguiente-ticket', ( payload , callback ) => {
        const siguiente = ticketControl.siguiente();
        callback( siguiente );
        // socket.broadcast().emit('notifica-ticket-nuevo',siguiente);
    })
}

module.exports = {
    socketController
}