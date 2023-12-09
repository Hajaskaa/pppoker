import { changePage, updateMainGameArea } from "./util.js";

export function createAndJoinRoomEvent(
  socket,
  createRoom,
  socketName,
  roomCode,
  socketsInTheRoomElement,
  socketsInTheRoomVoteNumbersElement,
  joinRoom,
  roomId,
  averageElement
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

  socket.on("updatePlayerAndVoteList", (names, votes, state) => {
    updateMainGameArea(
      socketsInTheRoomElement,
      socketsInTheRoomVoteNumbersElement,
      averageElement,
      names,
      votes,
      state
    );
  });
}
