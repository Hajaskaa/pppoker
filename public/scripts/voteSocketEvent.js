export function voteSocketEvent(socket, voteForm) {
  voteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    socket.emit("socketVote", e.submitter.id, (response) => {
      console.log(response);
    });
  });

  socket.on("socketVoteFromServer", (arg) => {
    console.log(arg);
  });
}
