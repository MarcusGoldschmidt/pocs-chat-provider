var io = {};
module.exports = (server, serveradmin) => {

    io = require('socket.io')(server);

    io.on('connection', function (socket) {

        // Pegar a url ainda nesse escopo
        socket.on('/', function (msg) {
            socket.broadcast.emit('/', {
                user: 'Anônimo',
                body: msg,
                digit: false
            });
        });
    });
};
