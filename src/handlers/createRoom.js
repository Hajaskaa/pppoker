const createRoomHandler = (io, socket, data) => {
  socket.on("socketCreateRoom", (arg, callback) => {
    if (arg) {
      const socketName = arg;
      data.socketNamesAndSocketIDs.set(socket.id, socketName);
      const currentRoomName = "room" + socket.id;
      socket.join(currentRoomName);
      data.roomsData[currentRoomName] = [socketName];
      data.votesData[currentRoomName] = ["0"];

      io.to(currentRoomName).emit(
        "newSocketInRoom",
        data.roomsData[currentRoomName]
      );

      console.log(data.roomsData);
      callback(currentRoomName);
    } else {
      callback("error");
    }
  });
};

export default createRoomHandler;
