import { createAndJoinRoomEvent } from "./createAndJoinRoomEvent.js";
import { voteSocketEvent } from "./voteSocketEvent.js";
import { copyRoomIdEvent } from "./util.js";
import { showVotesEvent } from "./showVotesEvent.js";
import { leaveRoomEvent } from "./leaveRoomEvent.js";
import setDefaultPage from "./setDefaultPage.js";
import nextRoundEvent from "./nextRoundEvent.js";

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
//CLIENT SIDE

//callback 1 client only, socket.on all clients in room or namespace
//dinamyc binding - no getelement needed

const socket = io();
setDefaultPage(socket);
nextRoundEvent(
  socket,
  nextRoundButton,
  socketsInTheRoomElement,
  socketsInTheRoomVoteNumbersElement,
  averageElement
);

createAndJoinRoomEvent(
  socket,
  createRoomElement,
  socketNameElement,
  roomCodeElement,
  socketsInTheRoomElement,
  socketsInTheRoomVoteNumbersElement,
  joinRoomElement,
  roomIdElement,
  averageElement
);

voteSocketEvent(
  socket,
  voteFormElement,
  socketsInTheRoomElement,
  socketsInTheRoomVoteNumbersElement,
  averageElement
);

showVotesEvent(
  socket,
  showVotesButton,
  socketsInTheRoomElement,
  socketsInTheRoomVoteNumbersElement,
  averageElement
);

copyRoomIdEvent(copyRoomIdElement, roomCodeElement);

leaveRoomEvent(socket, leaveRoomButton);
