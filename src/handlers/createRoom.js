export default function createRoomHandler(io, socket, data) {
  socket.on("socketCreateRoom", (arg, callback) => {
    if (arg) {
      const socketName = arg;
      data.socketNamesAndSocketIDs.set(socket.id, socketName);
      const currentRoomName = "room" + socket.id;
      socket.join(currentRoomName);
      data.roomsData[currentRoomName] = [socketName];
      data.votesData[currentRoomName] = ["0"];

      data.roomCatalog[currentRoomName] = [data.socketId];
      data.roomState[currentRoomName] = false;

      io.to(currentRoomName).emit(
        "updatePlayerAndVoteList",
        data.roomsData[currentRoomName]
      );

      callback(currentRoomName);
    } else {
      callback("error");
    }
  });
}
