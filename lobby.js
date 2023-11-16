//CLIENT SIDE

const lobbyTestButtonAction = document.getElementById("lobbyTestButtonAction");
// const socketName = document.getElementById("socketName");

lobbyTestButtonAction.addEventListener("submit", (e) => {
  console.log("asd");
  e.preventDefault();
  socket.emit("lobbyTestButtonAction", "world", (response) => {
    console.log(response);
  });
});
