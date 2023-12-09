import { updateMainGameArea } from "./util.js";

export default function nextRoundEvent(
  socket,
  nextRound,
  socketsInTheRoomElement,
  socketsInTheRoomVoteNumbersElement,
  averageElement
) {
  nextRound.addEventListener("click", (e) => {
    e.preventDefault();
    socket.emit("nextRoundEvent", () => {});
  });

  socket.on("nextRoundEventHandled", (names, votes, state) => {
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
