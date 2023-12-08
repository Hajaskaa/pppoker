export function leaveRoomEvent(socket, leaveButton) {
  leaveButton.addEventListener("click", (e) => {
    e.preventDefault();
    socket.emit("disconnectButtonAction", "", () => {
      location.reload();
    });
  });
}
