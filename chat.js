/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
//CLIENT SIDE

const socket = io();

const form = document.getElementById("form");
const socketName = document.getElementById("socketName");
const roomID = document.getElementById("roomID");
const voteForm = document.getElementById("vote-form");

const form2 = document.getElementById("form2");

const homepage = document.getElementById("homepage");
const lobbypage = document.getElementById("lobbypage");

const buttonOne = document.getElementById("1");

function changePage(pageId) {
  // Hide all sections
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.classList.remove("active");
  });

  // Show the selected section
  const selectedSection = document.getElementById(pageId);
  selectedSection.classList.add("active");
}

voteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("socketVote");

  console.log(e.submitter.id);
});

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

const joinRoomButton = document.getElementById("joinRoom");

joinRoomButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(roomId.value);
  if (roomId.value) {
    socket.emit(
      "joinRoomButtonAction",
      { roomId: roomId.value, socketName: socketName.value },
      (response) => {
        console.log(response);
      }
    );
    roomId.value = "";
  }
});

testButton.addEventListener("click", (e) => {
  console.log("asd");
  e.preventDefault();
  socket.emit("lobbyTestButtonAction", "world", (response) => {
    console.log(response);
  });
});

socket.on("lobbyTestRoomEvent", (e) => {
  console.log("lobbyTestRoomEvent successful. You are a literal god.");
});

socket.on("socketVoteFromServer", (socketName) => {
  //TO-DO loop and get the children based on socket name
  //TO-DO make its bg blue
  const parentElement = document.getElementById("socketsInTheRoom");
  const allChildNodes = parentElement.childNodes;

  let nodeElement = Array.from(allChildNodes).find(function (node) {
    return node.innerText === socketName;
  });

  console.log(nodeElement.innerText);
  console.log("socketVoteFromServer success elkapva socket oldalon");
  //TO-DO debug Kiirja masnal is + masiknal nyomva nem irja ki
});

const socketsInTheRoomDocumentElement =
  document.getElementById("socketsInTheRoom");

socket.on("newSocketInRoom", (arg) => {
  let child = socketsInTheRoomDocumentElement.lastElementChild;
  while (child) {
    socketsInTheRoomDocumentElement.removeChild(child);
    child = socketsInTheRoomDocumentElement.lastElementChild;
  }
  const socketNamesInRoom = arg;
  for (let socketName of socketNamesInRoom) {
    console.log("socketNamesInRoom");
    console.log(socketNamesInRoom);
    console.log("socketName");
    console.log(socketName);
    const item = document.createElement("li");
    item.textContent = socketName;
    socketsInTheRoom.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  }
});
