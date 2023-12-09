export default function nextRoundEvent(
  socket,
  nextRound,
  socketsInTheRoomVoteNumbersElement
) {
  nextRound.addEventListener("click", (e) => {
    e.preventDefault();
    socket.emit("nextRoundEvent", () => {});
  });
  socket.on("nextRoundEventHandled", (socketVotesInRoom) => {
    let child2 = socketsInTheRoomVoteNumbersElement.lastElementChild;
    while (child2) {
      socketsInTheRoomVoteNumbersElement.removeChild(child2);
      child2 = socketsInTheRoomVoteNumbersElement.lastElementChild;
    }
    for (let socketVote of socketVotesInRoom) {
      const item = document.createElement("li");
      console.log(socketVote);
      item.textContent = "?";
      socketsInTheRoomVoteNumbersElement.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    }
  });
}
