import { changePage } from "./util.js";

export function createAndJoinRoomEvent(
  socket,
  createRoom,
  socketName,
  roomCode,
  socketsInTheRoomElement,
  socketsInTheRoomVoteNumbersElement,
  joinRoom,
  roomId
) {
  createRoom.addEventListener("click", (e) => {
    e.preventDefault();

    if (socketName.value) {
      socket.emit("socketCreateRoom", socketName.value, (response) => {
        if (response === "error") {
          // This block is intentionally left empty
        } else {
          changePage("page2");
          roomCode.textContent = "RoomID: " + response;
        }
      });
      socketName.value = "";
    }
  });

  joinRoom.addEventListener("click", (e) => {
    e.preventDefault();
    if (roomId.value && socketName.value) {
      socket.emit(
        "joinRoomButtonAction",
        { roomId: roomId.value, socketName: socketName.value },
        (response) => {
          if (response === "-1") location.reload();
          else {
            changePage("page2");
            roomCode.textContent = "RoomID: " + response;
          }
        }
      );
      roomId.value = "";
    }
  });

  socket.on("updatePlayerAndVoteList", (arg) => {
    let child = socketsInTheRoomElement.lastElementChild;
    while (child) {
      socketsInTheRoomElement.removeChild(child);
      child = socketsInTheRoomElement.lastElementChild;
    }
    const socketNamesInRoom = arg;
    for (let socketName of socketNamesInRoom) {
      const item = document.createElement("li");
      item.textContent = socketName;
      socketsInTheRoomElement.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    }

    let child2 = socketsInTheRoomVoteNumbersElement.lastElementChild;
    while (child2) {
      socketsInTheRoomVoteNumbersElement.removeChild(child2);
      child2 = socketsInTheRoomVoteNumbersElement.lastElementChild;
    }
    for (let socketName of socketNamesInRoom) {
      const item = document.createElement("li");
      console.log(socketName);
      item.textContent = "?";
      socketsInTheRoomVoteNumbersElement.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    }
  });
}
