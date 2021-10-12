'use strict';

const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form#message");
const nickForm = document.querySelector("form#nick");
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
    const msg = { type, payload };
    return JSON.stringify(msg);
}


socket.addEventListener("open", () => {
    console.log("Connected to Server ✅️");
});

socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
    console.log("New message: ", message.data, " (from the Server)");
});

socket.addEventListener("close", () => {
    console.log("Disconnected from Server ❌️");
});

/*
setTimeout(() => {
    socket.send("hello from the browser!");
}, 3000);
*/

messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    const li = document.createElement("li");
    li.innerText = `Me: ${input.value}`;
    messageList.append(li);
    input.value = "";
});

nickForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
    input.value = "";
});