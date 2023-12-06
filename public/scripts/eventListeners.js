import { changePage } from "./util.js";

export function setupEventListeners(
  socket,
  createRoom,
  socketName,
  roomCode,
  joinRoom,
  roomId,
  showVotes,
  leaveRoom,
  voteForm,
  copyRoomId
) {
  createRoom.addEventListener("click", (e) => {
    e.preventDefault();

    if (socketName.value) {
      socket.emit("socketCreateRoom", socketName.value, (response) => {
        if (response === "error") {
          console.log("error hehe");
        } else {
          changePage("page2");
          console.log(response); // "got it"
          roomCode.textContent = "RoomID: " + response;
        }
      });
      console.log(socketName.value);
      socketName.value = "";
    }
  });

  joinRoom.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(roomId.value);
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

  showVotes.addEventListener("click", (e) => {
    e.preventDefault();
    socket.emit("showVotesButtonAction", (r) => {
      console.log(r);
    });
  });

  leaveRoom.addEventListener("click", (e) => {
    e.preventDefault();
    socket.emit("disconnectButtonAction", "", (arg) => {
      console.log(arg);
      location.reload();
    });
  });

  voteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    socket.emit("socketVote", e.submitter.id, (response) => {
      console.log(response);
    });
  });

  copyRoomId.addEventListener("click", (e) => {
    e.preventDefault();
    // get the container
    // const roomCodeElement = document.querySelector("#roomCode");
    // Create a fake `textarea` and set the contents to the text
    // you want to copy
    const storage = document.createElement("textarea");
    storage.value = roomCode.innerHTML.split(" ")[1];
    roomCode.appendChild(storage);

    // Copy the text in the fake `textarea` and remove the `textarea`
    storage.select();
    storage.setSelectionRange(0, 99999);
    document.execCommand("copy");
    roomCode.removeChild(storage);
  });
}
