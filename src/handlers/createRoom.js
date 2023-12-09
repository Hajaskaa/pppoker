export default function createRoomHandler(io, socket, data) {
  const {
    socketId,
    socketNamesAndSocketIDs,
    roomCatalog,
    roomsData,
    votesData,
    roomState,
  } = data;
  socket.on("socketCreateRoom", (arg, callback) => {
    if (arg) {
      const socketName = arg;
      socketNamesAndSocketIDs.set(socket.id, socketName);
      const roomName = "room" + socket.id;
      socket.join(roomName);
      roomsData[roomName] = [socketName];
      votesData[roomName] = ["0"];

      roomCatalog[roomName] = [socketId];
      roomState[roomName] = false;

      io.to(roomName).emit(
        "updatePlayerAndVoteList",
        roomsData[roomName],
        votesData[roomName],
        roomState[roomName]
      );

      callback(roomName);
    } else {
      callback("error");
    }
  });
}
