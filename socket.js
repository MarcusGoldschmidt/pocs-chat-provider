var io = {};
module.exports = (server, serveradmin) => {

    io = require('socket.io')(server);

    io.on('connection', function (socket) {
        socket.on('index', function (user) {
            if (user.send.digit === false) {
                socket.broadcast.emit(user.url, {
                    name: user.send.name,
                    msg: user.send.msg,
                    send: {
                        digit: false
                    }
                });
            }else{
                socket.broadcast.emit(user.url, {
                    send: {
                        name: user.send.name,
                        digit: true
                    }
                });
            }
        });
    });
};
