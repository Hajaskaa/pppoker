//CLIENT SIDE

const socket = io();

const form = document.getElementById("form");
const socketName = document.getElementById("socketName");
const messages = document.getElementById("messages");


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
    socket.emit("hello", socketName.value, (response) => {
      console.log(response); // "got it"
    });
    console.log(socketName.value);
    socketName.value = "";
  }
});
