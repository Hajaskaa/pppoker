export default function joinRoomHandler(io, socket, data) {
  const { roomsData, votesData } = data;
  socket.on("joinRoomButtonAction", (arg, callback) => {
    const currentRoomName = arg.roomId; //maybe we should switch to socket.rooms[1]
    const socketName = arg.socketName; //maybe we should get it from the Map/Set
    if (currentRoomName in roomsData) {
      console.log("Room name has been found");
      socket.join(currentRoomName);
      data.socketNamesAndSocketIDs.set(socket.id, socketName);

      roomsData[currentRoomName].push(socketName);
      votesData[currentRoomName].push("0");
      console.log("roomsData[currentRoomName]");
      console.log(roomsData[currentRoomName]);

      io.to(currentRoomName).emit(
        "newSocketInRoom",
        roomsData[currentRoomName]
      );

      callback(currentRoomName);
    } else {
      console.log("This room does not exist!");
      callback("-1");
    }
  });
}
