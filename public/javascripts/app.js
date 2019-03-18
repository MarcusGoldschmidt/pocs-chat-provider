// Socket IO
const socket = io();

const url = 'https://randomuser.me/api/';

const isDigit = [];

const user = {
    url: window.location.pathname,
    send: {
        name: '',
        msg: '',
        isDigit: false,
        color: null
    }
};

fetch(url)
    .then(resp => {
        resp.json()
            .then(data => {
                let name = data.results[0].name;
                user.send.name = name.first;
            });
    });

(function (window) {
    const msg = document.getElementById('msg');

    // Recebendo mensagens
    socket.on(user.url, function (data) {

        console.log(data);

        if (data.send.isDigit === true) {
            // Alguém está isDigitando
            isisDigit(data.send.name);
        } else {
            // Mensagem completa
            console.log(data);
            createDiv(data.msg, data.name);
        }

    });

    // Enviando
    msg.addEventListener('keyup', function (e) {
        user.send.msg = msg.value;
        if (e.key === "Enter") {
            user.send.isisDigit = false;
            createDivSelf(msg.value);
            socket.emit('index', user);
            msg.value = "";
        } else {
            user.send.isisDigit = true;
            socket.emit('index', {
                url: user.url,
                send: {
                    name: user.send.name,
                    isDigit: user.send.isDigit
                }
            });
        }
    });
}(this));

function isisDigit(name) {

    isDigit.push(name);

    let isDigiting = document.getElementById('isisDigit');
    isDigiting.innerText = isDigit[0] + " está isDigitando";

    setTimeout(function () {
        isDigit.shift();

        if(isDigit.length === 0){
            isDigiting.innerText = '';
        }
    }, 2000);
}

function createDivSelf() {
    let div = document.createElement("div");
    div.setAttribute("class", "chat__mensagem chat__mensagem--self chat__mensagem--send");

    let name = document.createElement("div");
    name.setAttribute("class", "chat__mensagem--name--self");
    name.innerText = user.send.name;

    let body = document.createElement("div");
    body.setAttribute("class", "chat__mensagem--body");
    body.innerText = user.send.msg;

    div.appendChild(name);
    div.appendChild(body);

    chat.appendChild(div);

    chat.scrollTop = div.offsetTop;
}

function createDiv(msg, author) {
    let chat = document.getElementById('chat');

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

}
