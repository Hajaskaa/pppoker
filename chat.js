/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
//CLIENT SIDE

//callback 1 client only, socket.on all clients in room or namespace

const socket = io();

const form = document.getElementById("form");
const socketName = document.getElementById("socketName");
const roomID = document.getElementById("roomID");
const voteForm = document.getElementById("vote-form");

const form2 = document.getElementById("form2");

const homepage = document.getElementById("homepage");
const lobbypage = document.getElementById("lobbypage");

const buttonOne = document.getElementById("1");
const roomCodeElement = document.getElementById("roomCode");

const leaveButton = document.getElementById("leave");

const socketsInTheRoomDocumentElement =
  document.getElementById("socketsInTheRoom");

const socketsInTheRoomVoteNumbersDocumentElement = document.getElementById(
  "socketsInTheRoomVoteNumbers"
);

let nameOfSocket;
let numberOfRoom;

function triggerExample1() {
  // get the container
  const element = document.querySelector("#roomCode");
  // Create a fake `textarea` and set the contents to the text
  // you want to copy
  const storage = document.createElement("textarea");
  storage.value = element.innerHTML.split(" ")[1];
  element.appendChild(storage);

  // Copy the text in the fake `textarea` and remove the `textarea`
  storage.select();
  storage.setSelectionRange(0, 99999);
  document.execCommand("copy");
  element.removeChild(storage);
}

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

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (socketName.value) {
    socket.emit("socketCreateRoom", socketName.value, (response) => {
      console.log(response); // "got it"
      roomCodeElement.textContent = "RoomID: " + response;
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
        roomCodeElement.textContent = "RoomID: " + response;
        console.log(response);
      }
    );
    roomId.value = "";
  }
});

// testButton.addEventListener("click", (e) => {
//   e.preventDefault();
//   socket.emit("lobbyTestButtonAction", "world", (response) => {
//     console.log(response);
//   });
// });

showVotesButton.addEventListener("click", (e) => {
  e.preventDefault();
  socket.emit("showVotesButtonAction", (r) => {
    console.log(r);
  });
});

// nextRoundButton.addEventListener("click", (e) => {
//   e.preventDefault();
//   socket.emit("nextRoundButtonAction", (r) => {
//     console.log(r);
//   });
// });

leaveButton.addEventListener("click", (e) => {
  e.preventDefault();
  socket.emit("disconnectButtonAction", "", (arg) => {
    console.log(arg);
    location.reload();
  });
});

socket.on("showVotesFromServer", (e) => {
  votes = e;

  console.log("votes");
  console.log(votes);
  let child2 = socketsInTheRoomVoteNumbersDocumentElement.lastElementChild;
  while (child2) {
    socketsInTheRoomVoteNumbersDocumentElement.removeChild(child2);
    child2 = socketsInTheRoomVoteNumbersDocumentElement.lastElementChild;
  }
  for (let vote of votes) {
    const item = document.createElement("li");
    console.log(vote);
    item.textContent = vote;
    socketsInTheRoomVoteNumbersDocumentElement.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  }

  console.log("votes1");
  console.log(votes);
  votes = votes.filter((word) => word !== "💀");
  console.log("votes2");
  console.log(votes);
  if (votes.length) {
    let numbers = votes.map(Number);
    let sum = numbers.reduce((acc, num) => acc + num, 0);
    let avg = sum / numbers.length;

    let roundedAverage = avg % 1 !== 0 ? avg.toFixed(1) : avg;

    average.textContent = "Average: " + roundedAverage;
  } else {
    average.textContent = "Please give meaningful votes! :)";
  }
});

socket.on("lobbyTestRoomEvent", (e) => {
  console.log("lobbyTestRoomEvent successful. You are a literal god.");
});

voteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("socketVote", e.submitter.id, (response) => {
    console.log(response);
  });
});

socket.on("socketVoteFromServer", (arg) => {
  console.log(arg);
});

socket.on("newSocketInRoom", (arg) => {
  let child = socketsInTheRoomDocumentElement.lastElementChild;
  while (child) {
    socketsInTheRoomDocumentElement.removeChild(child);
    child = socketsInTheRoomDocumentElement.lastElementChild;
  }
  const socketNamesInRoom = arg;
  for (let socketName of socketNamesInRoom) {
    const item = document.createElement("li");
    item.textContent = socketName;
    socketsInTheRoom.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  }

  let child2 = socketsInTheRoomVoteNumbersDocumentElement.lastElementChild;
  while (child2) {
    socketsInTheRoomVoteNumbersDocumentElement.removeChild(child2);
    child2 = socketsInTheRoomVoteNumbersDocumentElement.lastElementChild;
  }
  for (let socketName of socketNamesInRoom) {
    const item = document.createElement("li");
    console.log(socketName);
    item.textContent = "?";
    socketsInTheRoomVoteNumbersDocumentElement.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  }
});
