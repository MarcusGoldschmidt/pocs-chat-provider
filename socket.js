var io = {};
module.exports = (server, serveradmin) => {

    io = require('socket.io')(server);

    io.on('connection', function (socket) {

        // Pegando ip de Vacilaum heheh
        console.log('New connection from: ' + socket.handshake.address);

        socket.on('/', function (msg) {

            if (msg !== false) {
                socket.broadcast.emit('/', {
                    user: 'Anônimo',
                    body: msg,
                    digit: false
                });
            }
        });
    });
};
