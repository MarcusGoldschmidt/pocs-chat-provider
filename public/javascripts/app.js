// Socket IO
const socket = io();

(function (window) {
    const msg = document.getElementById('msg');
    msg.addEventListener('keyup', function () {
        socket.emit('chat message', msg.value);
    });
}(this));