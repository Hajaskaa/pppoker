export function voteSocketEvent(socket, voteForm) {
  voteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    socket.emit("socketVote", e.submitter.id, () => {});
  });

  socket.on("socketVoteFromServer", () => {});
}
