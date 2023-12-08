export default function voteSocketHandler(io, socket, data) {
  const { socketId, socketNamesAndSocketIDs, roomCatalog, votesData } = data;
  socket.on("socketVote", (vote, callback) => {
    // const socketId = socket.id;
    const socketName = socketNamesAndSocketIDs.get(socketId);
    const roomName = Array.from(socket.rooms)[1];
    const voteValue = vote;
    console.log("voteSocketHandler");
    const indexOfSocket = roomCatalog[roomName].findIndex(
      (socket) => socket === socketId
    );
    votesData[roomName].splice(indexOfSocket, 1);
    votesData[roomName].splice(indexOfSocket, 0, voteValue);
    io.to(roomName).emit("socketVoteFromServer");

    callback({
      socketId,
      socketName,
      roomName,
      voteValue,
      indexOfSocket,
      votesData,
    });
  });
}
