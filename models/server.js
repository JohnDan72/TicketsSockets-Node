const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets');

class Server{
    constructor(){
        this.app            = express();
        this.pathsRoutes    = {
            socketPath: '/api/sockets'
        }
        this.port           = process.env.PORT;

        // Socket io
        this.server     = require('http').createServer(this.app);
        this.io         = require('socket.io')(this.server);

        this.middlewares();
        this.routes();
        this.sockets();
    }

    middlewares(){
        //cors
        this.app.use(cors());
        //Directorio público
        this.app.use(express.static("public"));
    }

    routes(){
        // this.app.use(this.pathsRoutes.socketPath,require('../routes/sockets.routes').router);
    }

    sockets(){
        this.io.on('connection', socketController)
    }

    listen(){
        this.server.listen(this.port, () => {
            console.log(`Servidor en linea desde puerto: ${process.env.PORT}`);
        })
    }
}

module.exports = Server;