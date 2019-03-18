var io = {};
module.exports = (server, serveradmin) => {

    io = require('socket.io')(server);

    io.on('connection', function (socket) {
        socket.on('index', function (user) {
            console.log(JSON.stringify(user));
            socket.broadcast.emit(user.room, user);
        });
    });
};
