import { updateMainGameArea } from "./util.js";

export function showVotesEvent(
  socket,
  showVotes,
  socketsInTheRoomElement,
  socketsInTheRoomVoteNumbersElement,
  averageElement
) {
  showVotes.addEventListener("click", (e) => {
    e.preventDefault();
    socket.emit("showVotesButtonAction", () => {});
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
