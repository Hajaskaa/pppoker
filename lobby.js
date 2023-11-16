//CLIENT SIDE
const socket = io();
const form2 = document.getElementById("form2");
// const socketName = document.getElementById("socketName");

form2.addEventListener("click", (e) => {
  console.log("asd");
  e.preventDefault();
  socket.emit("lobbyTestButtonAction", "world", (response) => {
    console.log(response);
  });
});
