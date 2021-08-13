// label escritorio
const lbEscritorio = document.querySelector('h1');
const btnNuevo = document.querySelector('button');
const labelAtendiendo = document.querySelector('small');
const alert_ticket = document.querySelector('#id_alert');
const lblPendientes = document.querySelector('#lblPendientes');
//se checa si el escritorio existe en la propieda de la url
const searchParams = new URLSearchParams( window.location.search );

if(!searchParams.has('escritorio')){
    //  si no existe se retorna al index
    window.location = "index.html";
    throw new Error('El escritorio es obligatorio');
}
const escritorio = searchParams.get('escritorio');
lbEscritorio.textContent = escritorio;

// IO Sockets
const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    labelAtendiendo.textContent = ''
    btnNuevo.disabled = false;
    alert_ticket.classList.add('mi_hide');

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnNuevo.disabled = true;
    labelAtendiendo.textContent = 'Error | Desconectado'
    alert_ticket.classList.add('mi_hide');
});

socket.on('tickets-cola', (pensientes) => {
    lblPendientes.textContent = pensientes;
});


btnNuevo.addEventListener( 'click', () => {
    socket.emit('atender-ticket', { escritorio } , ( respuesta ) => {
        console.log(respuesta);
        if(respuesta.success){
            labelAtendiendo.textContent = `Ticket: ${respuesta.ticket.numero}`
            lblPendientes.classList.remove('mi_hide');
            alert_ticket.classList.add('mi_hide');
        }
        else{
            labelAtendiendo.textContent = 'Nadie';
            alert_ticket.classList.remove('mi_hide');
            lblPendientes.classList.add('mi_hide');
        }
    } );
});