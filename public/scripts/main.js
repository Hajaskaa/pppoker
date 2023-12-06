import { setupEventListeners } from "./eventListeners.js";

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
//CLIENT SIDE

//callback 1 client only, socket.on all clients in room or namespace
//dinamyc binding - no getelement needed

const socket = io();

setupEventListeners(
  socket,
  createRoomElement,
  socketNameElement,
  roomCodeElement,
  joinRoomElement,
  roomIdElement,
  showVotesButton,
  leaveRoomButton,
  voteFormElement,
  copyRoomIdElement
);

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

const socketsInTheRoomDocumentElement =
  document.getElementById("socketsInTheRoom");

const socketsInTheRoomVoteNumbersDocumentElement = document.getElementById(
  "socketsInTheRoomVoteNumbers"
);

socket.on("showVotesFromServer", (e) => {
  let votes = e;

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

socket.on("socketVoteFromServer", (arg) => {
  console.log(arg);
});
