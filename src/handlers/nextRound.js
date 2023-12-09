export default function nextRoundHandler(io, socket, data) {
  const { roomsData, votesData, roomState } = data;
  socket.on("nextRoundEvent", (callback) => {
    const roomName = Array.from(socket.rooms)[1];
    roomState[roomName] = false;
    votesData[roomName].fill("0");
    io.to(roomName).emit(
      "nextRoundEventHandled",
      roomsData[roomName],
      votesData[roomName],
      roomState[roomName]
    );

    callback(votesData[roomName]);
  });
}
