export default function leaveRoomHandler(io, socket, data) {
  const {
    socketId,
    socketNamesAndSocketIDs,
    roomsData,
    votesData,
    roomCatalog,
    roomState,
  } = data;
  socket.on("disconnectButtonAction", (arg, callback) => {
    const roomName = Array.from(socket.rooms)[1];
    const toBeDeletedIndex = roomCatalog[roomName].findIndex(
      (s) => s === socketId
    );
    roomsData[roomName].splice(toBeDeletedIndex, 1);
    roomCatalog[roomName].splice(toBeDeletedIndex, 1);
    votesData[roomName].splice(toBeDeletedIndex, 1);
    socketNamesAndSocketIDs.delete(socket.id);
    socket.leave(roomName);

    if (roomsData[roomName].length < 1) {
      delete roomsData[roomName];
      delete roomCatalog[roomName];
      delete votesData[roomName];
    }

    io.to(roomName).emit(
      "updatePlayerAndVoteList",
      roomsData[roomName],
      votesData[roomName],
      roomState[roomName]
    );
    // io.to(roomName).emit("updateVoteList", votesData[roomName]);
    callback({
      toBeDeletedIndex,
      roomsData,
      votesData,
    });

    console.log("DisconnectButtonAction data clear was successful");
  });
}
