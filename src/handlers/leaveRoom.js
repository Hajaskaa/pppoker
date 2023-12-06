export default function leaveRoomHandler(io, socket, data) {
  const { socketNamesAndSocketIDs, roomsData, votesData } = data;
  socket.on("disconnectButtonAction", (arg, callback) => {
    const roomName = Array.from(socket.rooms)[1];
    const socketId = socket.id;
    const socketName = socketNamesAndSocketIDs.get(socketId);
    console.log("roomsData[roomName]");
    console.log(roomsData[roomName]);
    console.log("socketName");
    console.log(socketName);
    const toBeDeletedIndex = roomsData[roomName].findIndex(
      (s) => s === socketName
    );
    roomsData[roomName].splice(toBeDeletedIndex, 1);
    votesData[roomName].splice(toBeDeletedIndex, 1);
    socketNamesAndSocketIDs.delete(socket.id);
    socket.leave(roomName);

    if (roomsData[roomName].length < 1) {
      delete roomsData[roomName];
      delete votesData[roomName];
    }

    io.to(roomName).emit("newSocketInRoom", roomsData[roomName]);
    io.to(roomName).emit("showVotesFromServer", votesData[roomName]);
    callback({
      toBeDeletedIndex,
      roomsData,
      votesData,
    });

    console.log("disconnectButtonAction data clear was successful");
  });
}
