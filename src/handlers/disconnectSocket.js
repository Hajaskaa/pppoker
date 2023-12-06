import { findStringInObject } from "../util/findStringInObject.js";

export default function disconnectSocketHandler(io, socket, data) {
  const { socketNamesAndSocketIDs, roomsData, votesData } = data;

  socket.on("disconnect", () => {
    console.log("socket.id");
    console.log(socket.id);
    const socketId = socket.id;
    let socketName;
    if (socketNamesAndSocketIDs.get(socketId)) {
      socketName = socketNamesAndSocketIDs.get(socketId);

      //GPT
      // Example: Find the string "dog" in the object of arrays
      let searchString = socketName;
      // Example: Find the string "dog" in the object of arrays
      let roomName = findStringInObject(roomsData, searchString);

      if (roomName !== null) {
        console.log(
          `Found "${searchString}" in the array with property name "${roomName}".`
        );
      } else {
        console.log(`"${searchString}" not found in any array.`);
      }

      console.log("socketName");
      console.log(socketName);

      console.log("roomName");
      console.log(roomName);

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
      console.log("socket disconnect data clear successful");
    } else {
      console.log("no name or rooms associated with the socket");
    }
  });
}
