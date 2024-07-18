console.log("Hello there!");
const socket = io();

const form = document.querySelector("#form");
const input = document.querySelector("#input");
const messages = document.querySelector("#messages");
const total = document.querySelector("#users");

form.addEventListener("submit", function(e) {
    e.preventDefault();
    const message = input.value;
    if (message) {
        socket.emit("chat-message", message);
        input.value = "";
    }
    return
});

socket.on("chat-message", ({ message, id }) => {
    console.log(message)
    const li = document.createElement("li");

    if (socket.id === id) {
        li.classList.add("me");
    }
    li.textContent = message

    messages.appendChild(li);
});

socket.on("total-users", function(size) {
    total.textContent = size.toString();
});
