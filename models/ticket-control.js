const path = require('path');
const fs = require('fs');



class Ticket{
    constructor( numero , escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


class TicketContol{

    constructor(){
        this.ultimo     = 0;
        this.hoy        = new Date().getDate();
        this.tickets    = [];
        this.ultimos4   = [];

        this.init();
    }

    get toJson(){
        return {
            ultimo: this.ultimo  ,
            hoy:    this.hoy     ,
            tickets: this.tickets ,
            ultimos4: this.ultimos4
        }
    }

    init() {
        const { hoy , tickets , ultimos4 , ultimo} = require('../dataDB/data.json');
        console.log(hoy , tickets , ultimos4 , ultimo);
        if(hoy === this.hoy){
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;
        }
        else{
            this.guardarDB();
        }
    }

    guardarDB() {
        const mipath = path.join(__dirname,'../dataDB/data.json');
        fs.writeFileSync(mipath,JSON.stringify(this.toJson))
    }

    siguiente(){
        this.ultimo += 1;
        const ticket = new Ticket(this.ultimo,null);
        this.tickets.push(ticket);
        this.guardarDB();

        return `Ticket ${ticket.numero}`;
    }

    atenderTicket( escritorio ){
        // no tenemos tickets
        if( this.tickets.length == 0){
            return null;
        }
        //se saca del arreglo
        const ticketAux = this.shift();
        //se pone escritorio
        ticketAux.escritorio = escritorio;

        this.ultimos4.unshift(ticketAux);

        if(this.ultimos4.length > 4){
            this.ultimos4.slice(-1,1);
        }
        this.guardarDB();

        return ticketAux;
    }
}

module.exports = TicketContol;