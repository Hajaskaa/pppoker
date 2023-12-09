import { findStringInObjectOfArrays } from "../util/findStringInObject.js";

export default function disconnectSocketHandler(io, socket, data) {
  const {
    socketId,
    socketNamesAndSocketIDs,
    roomsData,
    votesData,
    roomCatalog,
    roomState,
  } = data;

  socket.on("disconnect", () => {
    if (socketNamesAndSocketIDs.get(socketId)) {
      //GPT
      // Example: Find the string "dog" in the object of arrays
      let searchString = socketId;
      console.log("searchString: " + searchString);
      // Example: Find the string "dog" in the object of arrays
      let roomName = findStringInObjectOfArrays(roomCatalog, searchString);
      console.log("roomName: " + roomName);
      if (roomName) {
        const toBeDeletedIndex = roomCatalog[roomName].findIndex(
          (s) => s === socketId
        );
        roomCatalog[roomName].splice(toBeDeletedIndex, 1);
        roomsData[roomName].splice(toBeDeletedIndex, 1);
        votesData[roomName].splice(toBeDeletedIndex, 1);

        console.log(
          `Found "${searchString}" in the array with property name "${roomName} and it has been deleted from all records".`
        );
      } else {
        console.log(`"${searchString}" not found in any array.`);
      }

      socketNamesAndSocketIDs.delete(socket.id);
      socket.leave(roomName);

      if (roomCatalog[roomName].length < 1) {
        delete roomsData[roomName];
        delete roomCatalog[roomName];
        delete votesData[roomName];
        console.log("room " + roomName + " deleted");
      } else {
        console.log(
          "Room still active, remaining sockets: " + roomCatalog[roomName]
        );
        io.to(roomName).emit(
          "updatePlayerAndVoteList",
          roomsData[roomName],
          votesData[roomName],
          roomState[roomName]
        );
      }

      console.log("Socket disconnect data clear successful");
    } else {
      console.log("No name or rooms associated with the socket");
    }

    console.log(socket.id + " left the server.");
  });
}
