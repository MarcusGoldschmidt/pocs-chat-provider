var io = {};
module.exports = (server, serveradmin) => {

    io = require('socket.io')(server);

    io.on('connection', function (socket) {
        // Pegar a url ainda nesse escopo
        socket.on('/', function (user) {
            if (user !== false) {
                socket.broadcast.emit('/', {
                    name: user.send.name,
                    msg: user.send.msg
                });
            }
        });
    });
};
