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
      let socketName = arg.trim();
      if (socketName.length > 20) socketName = socketName.slice(0, 20);
      socketNamesAndSocketIDs.set(socket.id, socketName);
      const roomName = "room" + socket.id;
      socket.join(roomName);
      roomsData[roomName] = [socketName];
      votesData[roomName] = ["0"];
      //check if theres room in input for added security
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
