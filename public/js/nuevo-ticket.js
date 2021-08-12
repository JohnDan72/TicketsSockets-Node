let labelTicket = document.querySelector('#lblNuevoTicket');
let btnCrear = document.querySelector('button');


const socket = io();

// connect
socket.on('connect', () => {

    btnCrear.disabled = false;

});
// disconnect
socket.on('disconnect', () => {

    btnCrear.disabled = true;
});

 
socket.on('enviar-mensaje', (payload) => {
    console.log( payload )
})

socket.on('ultimo-ticket', (ultimoTicket) => {
    labelTicket.innerHTML = ultimoTicket;
})


btnCrear.addEventListener( 'click', () => {
    socket.emit( 'siguiente-ticket', null, ( ticketCreado ) => {
        console.log('Desde el server: ', ticketCreado );
        labelTicket.innerHTML = ticketCreado;
    });

});

console.log('Nuevo Ticket HTML');