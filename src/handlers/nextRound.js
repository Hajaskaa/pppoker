export default function nextRoundHandler(io, socket, data) {
  const { votesData, roomState } = data;
  socket.on("nextRoundEvent", (callback) => {
    const currentRoomName = Array.from(socket.rooms)[1];
    roomState[currentRoomName] = false;
    io.to(currentRoomName).emit(
      "nextRoundEventHandled",
      votesData[currentRoomName],
      roomState[currentRoomName]
    );

    callback(votesData[currentRoomName]);
  });
}
