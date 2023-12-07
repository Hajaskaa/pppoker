export default function nextRoundHandler(io, socket, data) {
    const { votesData } = data;
    socket.on("nextRoundEvent", (callback) => {
      const currentRoomName = Array.from(socket.rooms)[1];
      io.to(currentRoomName).emit("nextRoundEventHandled", votesData[currentRoomName]);
  
      callback(votesData[currentRoomName]);
    });
  }
  