export default function joinRoomHandler(io, socket, data) {
  const { socketId, roomsData, votesData, roomCatalog } = data;
  socket.on("joinRoomButtonAction", (arg, callback) => {
    const currentRoomName = arg.roomId; //maybe we should switch to socket.rooms[1] --> we can't its not in it yet
    const socketName = arg.socketName; //maybe we should get it from the Map/Set
    if (currentRoomName in roomsData) {
      console.log(
        "Room name has been found, " + socketId + " joined " + currentRoomName
      );
      socket.join(currentRoomName);
      data.socketNamesAndSocketIDs.set(socket.id, socketName);

      roomsData[currentRoomName].push(socketName);
      votesData[currentRoomName].push("0");
      roomCatalog[currentRoomName].push(socketId);

      io.to(currentRoomName).emit(
        "updatePlayerList",
        roomsData[currentRoomName]
      );

      callback(currentRoomName);
    } else {
      console.log("This room does not exist!");
      callback("-1");
    }
  });
}
