var io = {};
module.exports = (server, serveradmin) => {
    io = require('socket.io')(server);
    io.on('connection', function (socket) {
        console.log('A user connected');
        socket.on('chat message', function (msg) {
            console.log('Message: ' + msg);
        });
    });
};
