export default function voteSocketHandler(io, socket, data) {
  const { socketId, socketNamesAndSocketIDs, roomsData, votesData } = data;
  socket.on("socketVote", (vote, callback) => {
    // const socketId = socket.id;
    const socketName = socketNamesAndSocketIDs.get(socketId);
    const roomName = Array.from(socket.rooms)[1];
    const voteValue = vote;

    const indexOfSocket = roomsData[roomName].findIndex(
      (socket) => socket === socketName
    );
    votesData[roomName].splice(indexOfSocket, 1);
    console.log("votesData1");
    console.log(votesData);
    votesData[roomName].splice(indexOfSocket, 0, voteValue);
    console.log("votesData2");
    console.log(votesData);

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
