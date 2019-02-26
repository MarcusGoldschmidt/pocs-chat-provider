// Socket IO
const socket = io();

(function (window) {
    const msg = document.getElementById('msg');
    msg.addEventListener('keyup', function (e) {
        if(e.key === "Enter"){
            socket.emit('chat message', msg.value);
        }else{
            socket.emit('chat message', "Digitando...");
        }
    });
}(this));
