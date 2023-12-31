export default function joinRoomHandler(io, socket, data) {
  const { socketId, roomsData, votesData, roomCatalog, roomState } = data;
  socket.on("joinRoomButtonAction", (arg, callback) => {
    if (arg.roomId && arg.socketName) {
      const roomName = arg.roomId; //maybe we should switch to socket.rooms[1] --> we can't its not in it yet
      let socketName = arg.socketName.trim(); //maybe we should get it from the Map/Set
      if (socketName.length > 20) socketName = socketName.slice(0, 20);
      if (roomName in roomsData) {
        console.log(
          "Room name has been found, " + socketId + " joined " + roomName
        );
        socket.join(roomName);
        data.socketNamesAndSocketIDs.set(socket.id, socketName);

        roomsData[roomName].push(socketName);
        votesData[roomName].push("0");
        roomCatalog[roomName].push(socketId);

        io.to(roomName).emit(
          "updatePlayerAndVoteList",
          roomsData[roomName],
          votesData[roomName],
          roomState[roomName]
        );

        callback(roomName);
      } else {
        console.log("This room does not exist!");
        callback("-1");
      }
    } else {
      callback("-1");
    }
  });
}
