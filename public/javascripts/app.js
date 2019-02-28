// Socket IO
const socket = io();

const url = 'https://randomuser.me/api/';

const digit = [];

const user = {
    url: window.location.pathname,
    send: {
        name: '',
        msg: '',
        digit: false,
        color: null
    }
};

fetch(url)
    .then(resp => {
        resp.json()
            .then(data => {
                let name = data.results[0].name;
                user.send.name = name.title + ' ' + name.first;
            });
    });

(function (window) {
    const msg = document.getElementById('msg');

    // Recebendo mensagens
    socket.on(user.url, function (data) {
        if (data.send.digit === true) {
            // Alguém está digitando
            isDigit(data.send.name);
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
            user.send.digit = false;
            createDivSelf(msg.value);
            socket.emit('index', user);
            msg.value = "";
        } else {
            user.send.digit = true;
            socket.emit('index', {
                url: user.url,
                send: {
                    name: user.send.name,
                    digit: user.send.digit
                }
            });
        }
    });
}(this));

function isDigit(name) {

    digit.push(name);

    let isDigiting = document.getElementById('isDigit');
    isDigiting.innerText = digit[0] + " está digitando";

    setTimeout(function () {
        digit.shift();

        if(digit.length === 0){
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
