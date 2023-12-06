export default function showVotesHandler(io, socket, data) {
  const { votesData } = data;
  socket.on("showVotesButtonAction", (callback) => {
    const currentRoomName = Array.from(socket.rooms)[1];
    io.to(currentRoomName).emit(
      "showVotesFromServer",
      votesData[currentRoomName]
    );

    callback(votesData[currentRoomName]);
  });
}
