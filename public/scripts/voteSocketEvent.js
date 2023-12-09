import { updateMainGameArea } from "./util.js";

export function voteSocketEvent(
  socket,
  voteForm,
  socketsInTheRoomElement,
  socketsInTheRoomVoteNumbersElement,
  averageElement
) {
  voteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    socket.emit("socketVote", e.submitter.id, () => {});
  });

  socket.on("socketVoteFromServer", (names, votes, state) => {
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
