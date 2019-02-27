// Socket IO
const socket = io();

const room = "";

(function (window) {
    const msg = document.getElementById('msg');
    const chat = document.getElementById('chat');

    // Recebendo mensagens
    socket.on('/', function (data) {
        if (data.user !== undefined) {
            createDiv(data.body, data.user);
        }
    });

    // Enviando
    msg.addEventListener('keyup', function (e) {
        if (e.key === "Enter") {
            createDiv(msg.value);

            socket.emit('/', msg.value);
            msg.value = "";
        } else {
            socket.emit('/', false);
        }
    });
}(this));

function createDiv(msg, author) {
    if(author !== undefined){
        let div = document.createElement("div");
        div.setAttribute("class", "chat__mensagem");

        let name = document.createElement("div");
        name.setAttribute("class", "chat__mensagem--name");
        name.innerText = author;

        let body = document.createElement("div");
        body.setAttribute("class", "chat__mensagem--body");
        body.innerText = msg;

        div.appendChild(name);
        div.appendChild(body);

        chat.appendChild(div);

        chat.scrollTop = div.offsetTop;
    }else{
        let div = document.createElement("div");
        div.setAttribute("class", "chat__mensagem chat__mensagem--self chat__mensagem--send");

        let name = document.createElement("div");
        name.setAttribute("class", "chat__mensagem--name--self");
        name.innerText = "Eu 'memo'";

        let body = document.createElement("div");
        body.setAttribute("class", "chat__mensagem--body");
        body.innerText = msg;

        div.appendChild(name);
        div.appendChild(body);

        chat.appendChild(div);

        chat.scrollTop = div.offsetTop;
    }
}
