const labelsTickets = {
    'label1': document.querySelector('#lblTicket1'),
    'label2': document.querySelector('#lblTicket2'),
    'label3': document.querySelector('#lblTicket3'),
    'label4': document.querySelector('#lblTicket4')
}
const labelsEscritorios = {
    'label1': document.querySelector('#lblEscritorio1'),
    'label2': document.querySelector('#lblEscritorio2'),
    'label3': document.querySelector('#lblEscritorio3'),
    'label4': document.querySelector('#lblEscritorio4')
}

// IO Sockets
const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    
});


socket.on('estado-actual', (payload) => {
    console.log(payload);

    const audio = new Audio('./audio/new-ticket.mp3');
    audio.play();

    const [tick_1,tick_2,tick_3,tick_4] = payload;

    if(tick_1){
        labelsTickets['label1'].textContent = 'Ticket: '+tick_1.numero
        labelsEscritorios['label1'].textContent = tick_1.escritorio
    }
    else{
        labelsTickets['label1'].textContent = ''
        labelsEscritorios['label1'].textContent = ''
    }
    if(tick_2){
        labelsTickets['label2'].textContent = 'Ticket: '+tick_2.numero
        labelsEscritorios['label2'].textContent = tick_2.escritorio
    }
    else{
        labelsTickets['label2'].textContent = ''
        labelsEscritorios['label2'].textContent = ''
    }
    if(tick_3){
        labelsTickets['label3'].textContent = 'Ticket: '+tick_3.numero
        labelsEscritorios['label3'].textContent = tick_3.escritorio
    }
    else{
        labelsTickets['label3'].textContent = ''
        labelsEscritorios['label3'].textContent = ''
    }
    if(tick_4){
        labelsTickets['label4'].textContent = 'Ticket: '+tick_4.numero
        labelsEscritorios['label4'].textContent = tick_4.escritorio
    }
    else{
        labelsTickets['label4'].textContent = ''
        labelsEscritorios['label4'].textContent = ''
    }
    
})