//CLIENT SIDE

const socket = io();

const form = document.getElementById("form");
const socketName = document.getElementById("socketName");
const messages = document.getElementById("messages");

const form2 = document.getElementById("form2");

const homepage = document.getElementById("homepage");
const lobbypage = document.getElementById("lobbypage");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  goToLobbyPage();

  if (socketName.value) {
    socket.emit("hello", socketName.value, (response) => {
      console.log(response); // "got it"
    });
    console.log(socketName.value);
    socketName.value = "";
  }
});

form2.addEventListener("click", (e) => {
  console.log("asd");
  e.preventDefault();
  socket.emit("lobbyTestButtonAction", "world", (response) => {
    console.log(response);
  });
});

function goToLobbyPage() {
  homepage.classList.add("notvisible");
  homepage.classList.remove("visible");
  lobbypage.classList.add("visible");
  lobbypage.classList.remove("notvisible");
  lobbypage.offsetWidth;
  homepage.offsetWidth;
}
