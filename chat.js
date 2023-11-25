//CLIENT SIDE

const socket = io();

const form = document.getElementById("form");
const socketName = document.getElementById("socketName");
const roomID = document.getElementById("roomID");
const messages = document.getElementById("messages");

const form2 = document.getElementById("form2");

const homepage = document.getElementById("homepage");
const lobbypage = document.getElementById("lobbypage");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (socketName.value) {
    socket.emit("socketCreateRoom", socketName.value, (response) => {
      console.log(response); // "got it"
    });
    console.log(socketName.value);
    socketName.value = "";
  }
});

const joinRoomButton = document.getElementById("joinRoom")
joinRoomButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(roomID.value);
});

form2.addEventListener("click", (e) => {
  console.log("asd");
  e.preventDefault();
  socket.emit("lobbyTestButtonAction", "world", (response) => {
    console.log(response);
  });
});

socket.on("lobbyTestRoomEvent", (e) => {
  console.log("lobbyTestRoomEvent successful. You are a literal god.");
});
