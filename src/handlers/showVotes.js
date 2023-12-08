export default function showVotesHandler(io, socket, data) {
  const { votesData, roomState } = data;
  socket.on("showVotesButtonAction", (callback) => {
    const currentRoomName = Array.from(socket.rooms)[1];
    roomState[currentRoomName] = true;
    io.to(currentRoomName).emit("updateVoteList", votesData[currentRoomName]);

    callback(votesData[currentRoomName]);
  });
}
