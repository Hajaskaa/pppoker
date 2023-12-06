import { changePage } from "./chat.js";

export function setupEventListeners(socket, form, socketName, roomCodeElement) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (socketName.value) {
      socket.emit("socketCreateRoom", socketName.value, (response) => {
        if (response === "error") {
          console.log("error hehe");
        } else {
          changePage("page2");
          console.log(response); // "got it"
          roomCodeElement.textContent = "RoomID: " + response;
        }
      });
      console.log(socketName.value);
      socketName.value = "";
    }
  });
}
