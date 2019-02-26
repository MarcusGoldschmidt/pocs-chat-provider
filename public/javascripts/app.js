// Socket IO
const socket = io();

(function (window) {
    const msg = document.getElementById('msg');
    const chat = document.getElementById('chat');

    // Recebendo mensagens
    socket.on('/', function (data) {

        if (data.user !== undefined) {
            let div = document.createElement("div");
            div.setAttribute("class", "chat__mensagem");

            let name = document.createElement("div");
            name.setAttribute("class", "chat__mensagem--name");
            name.innerText = data.user;

            let body = document.createElement("div");
            body.setAttribute("class", "chat__mensagem--body");
            body.innerText = data.body;

            div.appendChild(name);
            div.appendChild(body);

            chat.appendChild(div);

            chat.scrollTop = div.offsetTop;
        }
    });

    // Enviando
    msg.addEventListener('keyup', function (e) {
        if (e.key === "Enter") {
            let div = document.createElement("div");
            div.setAttribute("class", "chat__mensagem chat__mensagem--self chat__mensagem--send");

            let name = document.createElement("div");
            name.setAttribute("class", "chat__mensagem--name--self");
            name.innerText = "Eu 'memo'";

            let body = document.createElement("div");
            body.setAttribute("class", "chat__mensagem--body");
            body.innerText = msg.value;

            div.appendChild(name);
            div.appendChild(body);

            chat.appendChild(div);

            chat.scrollTop = div.offsetTop;

            socket.emit('/', msg.value);
            msg.value = "";
        } else {
            socket.emit('/', false);
        }
    });
}(this));
