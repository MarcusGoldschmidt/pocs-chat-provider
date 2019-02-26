var io = {};
module.exports = (server, serveradmin) => {

    io = require('socket.io')(server);

    io.on('connection', function (socket) {

        socket.broadcast.emit('/','user connected');

        socket.on('/', function (msg) {
            if (msg !== false) {
                console.log(msg);
                socket.broadcast.emit('/', {
                    user: 'Anônimo',
                    body: msg,
                    digit: false
                });
            }
        });
    });
};
