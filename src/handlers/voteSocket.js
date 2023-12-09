export default function voteSocketHandler(io, socket, data) {
  const {
    roomsData,
    roomState,
    socketId,
    socketNamesAndSocketIDs,
    roomCatalog,
    votesData,
  } = data;
  socket.on("socketVote", (vote, callback) => {
    // const socketId = socket.id;
    const socketName = socketNamesAndSocketIDs.get(socketId);
    const roomName = Array.from(socket.rooms)[1];
    const voteValue = vote;
    console.log("voteSocketHandler");

    if (roomName) {
      const indexOfSocket = roomCatalog[roomName].findIndex(
        (socket) => socket === socketId
      );

      votesData[roomName].splice(indexOfSocket, 1);
      votesData[roomName].splice(indexOfSocket, 0, voteValue);
    } else {
      console.log("Critical error with findIndex");
      console.log(
        "socketId,socketNamesAndSocketIDs,roomsData,votesData,roomCatalog,roomState"
      );
      console.log(
        socketId,
        socketNamesAndSocketIDs,
        roomsData,
        votesData,
        roomCatalog,
        roomState
      );
    }

    io.to(roomName).emit(
      "socketVoteFromServer",
      roomsData[roomName],
      votesData[roomName],
      roomState[roomName]
    );

    callback({
      socketId,
      socketName,
      roomName,
      voteValue,
      votesData,
    });
  });
}
