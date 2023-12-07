export default function showVotesHandler(io, socket, data) {
  const { votesData } = data;
  socket.on("showVotesButtonAction", (callback) => {
    const currentRoomName = Array.from(socket.rooms)[1];
    io.to(currentRoomName).emit("updateVoteList", votesData[currentRoomName]);

    callback(votesData[currentRoomName]);
  });
}
