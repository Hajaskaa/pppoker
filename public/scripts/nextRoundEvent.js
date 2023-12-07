export default function nextRoundEvent (socket, nextRound){
    nextRound.addEventListener("click", (e) => {
        e.preventDefault();
        socket.emit("nextRoundEvent", () => {});
    })
    socket.on("nextRoundEventHandled", () => {console.log("Sajt")});
}
  