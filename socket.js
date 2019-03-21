var io = {};
var rooms = [];
module.exports = (server, serveradmin) => {

    io = require('socket.io')(server);

    io.on('connection', function (socket) {

        // Entranda no servidor
        socket.on('connected', function (user) {

            socket.client.name = user.name;
            socket.client.room = user.room;

            // Recebendo todos os usuarios da sala
            rooms.forEach((room) => {
                if (room.room === user.room) {
                    io.to(socket.client.id).emit(user.room + "_all_users", room.users);
                }
            });

            // Verifica se a sala existe
            const containsRooms = rooms.some((room) => {
                return user.room === room.room;
            });

            // Se sala não existe cria uma nova
            if (!containsRooms) {
                rooms.push({
                    room: user.room,
                    users: [{
                        uid: socket.client.id,
                        name: user.name
                    }]
                });
            } else {
                // Adiciona participante na sala
                rooms.forEach((room) => {
                    if (room.room === user.room) {
                        room.users.push({
                            uid: socket.client.id,
                            name: user.name
                        });
                    }
                });
            }

            // Enviando para uma sala especifica unica que o usuario entrou
            socket.broadcast.emit(socket.client.room + "_user_in", {
                uid: socket.client.id,
                name: socket.client.name,
            });
        });

        // Emitindo mensagem
        socket.on('index', function (user) {
            socket.broadcast.emit(user.room, user);
        });

        // Saindo da sala
        socket.on('disconnect', function () {

            // Removendo usuario da sala
            rooms.forEach((room) => {
                if (room.room === socket.client.room) {
                    let newUsers = [];

                    room.users.forEach((user) => {
                        if (user.name !== socket.client.name) {
                            newUsers.push(user);
                        }
                    });

                    room.users = newUsers;
                }
            });

            // Enviando para uma sala especifica unica
            socket.broadcast.emit(socket.client.room + "_user_out", {
                uid: socket.client.id,
                name: socket.client.name,
            });
        });
    });
};
