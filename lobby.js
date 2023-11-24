//CLIENT SIDE
const socket = io();

// const socketName = document.getElementById("socketName");
const form2 = document.getElementById("form2");
form2.addEventListener("click", (e) => {
  // console.log("asd");
  e.preventDefault();
  socket.emit("lobbyTestButtonAction", "world", (response) => {
    // console.log(response);
  });
});
