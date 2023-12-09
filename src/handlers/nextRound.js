export default function nextRoundHandler(io, socket, data) {
  const { votesData, roomState} = data;
  socket.on("nextRoundEvent", (callback) => {
    const currentRoomName = Array.from(socket.rooms)[1];
    roomState[currentRoomName] = false;
    votesData[currentRoomName].fill("0");
    io.to(currentRoomName).emit(
      "nextRoundEventHandled",
      votesData[currentRoomName]
    );

    callback(votesData[currentRoomName]);
  });
}
