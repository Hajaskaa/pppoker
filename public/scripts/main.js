import { createAndJoinRoomEvent } from "./createAndJoinRoomEvent.js";
import { voteSocketEvent } from "./voteSocketEvent.js";
import { copyRoomIdEvent } from "./util.js";
import { showVotesEvent } from "./showVotesEvent.js";
import { leaveRoomEvent } from "./leaveRoomEvent.js";
import setDefaultPage from "./setDefaultPage.js";

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
//CLIENT SIDE

//callback 1 client only, socket.on all clients in room or namespace
//dinamyc binding - no getelement needed

const socket = io();
setDefaultPage(socket);

createAndJoinRoomEvent(
  socket,
  createRoomElement,
  socketNameElement,
  roomCodeElement,
  socketsInTheRoomElement,
  socketsInTheRoomVoteNumbersElement,
  joinRoomElement,
  roomIdElement
);

voteSocketEvent(socket, voteFormElement);

showVotesEvent(
  socket,
  showVotesButton,
  socketsInTheRoomVoteNumbersElement,
  averageElement
);

copyRoomIdEvent(copyRoomIdElement, roomCodeElement);

leaveRoomEvent(socket, leaveRoomButton);
