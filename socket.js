var io = {};
module.exports = (server, serveradmin) => {

    io = require('socket.io')(server);

    io.on('connection', function (socket) {
        // Pegar a url ainda nesse escopo
        socket.on('index', function (user) {
            if (user !== false) {
                socket.broadcast.emit(user.url, {
                    name: user.send.name,
                    msg: user.send.msg
                });
            }
        });
    });
};
