export default function showVotesHandler(io, socket, data) {
  const { roomsData, votesData, roomState } = data;
  socket.on("showVotesButtonAction", (callback) => {
    const roomName = Array.from(socket.rooms)[1];
    roomState[roomName] = true;
    io.to(roomName).emit(
      "updatePlayerAndVoteList",
      roomsData[roomName],
      votesData[roomName],
      roomState[roomName]
    );

    callback(votesData[roomName]);
  });
}
