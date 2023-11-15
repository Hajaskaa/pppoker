//CLIENT SIDE

const socket = io();

const form = document.getElementById("form");
const socketName = document.getElementById("socketName");
const messages = document.getElementById("messages");
// const socketName = document.getElementById("socketName");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   if (input.value) {
//     socket.emit("chat message", input.value);
//     input.value = "";
//   }
// });

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (socketName.value) {
    socket.emit("hello", "world", (response) => {
      console.log(response); // "got it"
    });
    console.log(socketName.value);
    socketName.value = "";
  }
});
