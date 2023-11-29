import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createServer } from "node:http";
import { Server } from "socket.io";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);

const socketNamesAndSocketIDs = new Map();
const roomsData = {};
const votesData = {};

const setHeaders = function (req, res, next) {
  res.set("macska", "cica");
  next();
};
app.use(setHeaders);

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  const filePath = join(__dirname, "index.html");
  res.sendFile(filePath);
});

app.get("/:path*", function (req, res) {
  const filePath = join(__dirname, "index.html");
  res.sendFile(filePath);
  // console.log("ez az egyik: " + req.params.path);
  //console.log("sonka: ");
  //console.log(req);
});

io.on("connection", async (socket) => {
  // const clients = await io.allSockets();

  socket.on("socketCreateRoom", (arg, callback) => {
    const socketName = arg;
    socketNamesAndSocketIDs.set(socket.id, socketName);
    const currentRoomName = "room" + socket.id;
    socket.join(currentRoomName);
    roomsData[currentRoomName] = [socketName];
    votesData[currentRoomName] = ["0"];

    io.to(currentRoomName).emit("newSocketInRoom", roomsData[currentRoomName]);

    console.log(roomsData);
    callback(currentRoomName);
  });

  socket.on("joinRoomButtonAction", (arg, callback) => {
    const currentRoomName = arg.roomId;
    const socketName = arg.socketName;
    socket.join(currentRoomName);
    socketNamesAndSocketIDs.set(socket.id, socketName);
    //TODO APP BREAKING: VERIFY IF ROOM IS ALREADY EXISTING
    roomsData[currentRoomName].push(socketName);
    votesData[currentRoomName].push("0");

    console.log("roomsData[currentRoomName]");
    console.log(roomsData[currentRoomName]);
    io.to(currentRoomName).emit("newSocketInRoom", roomsData[currentRoomName]);

    callback(currentRoomName);
  });

  socket.on("socketVote", (vote, callback) => {
    const socketId = socket.id;
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

  // socket.on("lobbyTestButtonAction", (arg, callback) => {
  //   console.log(clients);
  //   console.log("roomNames: " + roomsData);
  //   // console.log(
  //   //   "socketNamesAndSocketIDs: " + [...socketNamesAndSocketIDs.entries()]
  //   // );
  //   const array = Array.from(socket.rooms);
  //   console.log(array[1]);
  //   io.to(array[1]).emit("lobbyTestRoomEvent");
  //   callback([...socketNamesAndSocketIDs.entries()]);
  // });

  socket.on("showVotesButtonAction", (callback) => {
    const currentRoomName = Array.from(socket.rooms)[1];
    io.to(currentRoomName).emit(
      "showVotesFromServer",
      votesData[currentRoomName]
    );

    callback(votesData[currentRoomName]);
  });

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
    callback({
      toBeDeletedIndex,
      roomsData,
      votesData,
    });
  });

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
      io.to(roomName).emit("showVotesFromServer", roomsData[roomName]);
      console.log("socket disconnect data clear successful");
    } else {
      console.log("no name or rooms associated with the socket");
    }
  });
});

// Function to find a string in the object of arrays and return the property name
function findStringInObject(object, searchString) {
  let foundKey = null;

  // Iterate through the keys (property names) of the object
  for (let key in object) {
    if (
      Object.prototype.hasOwnProperty.call(object, key) &&
      Array.isArray(object[key])
    ) {
      // Iterate through the elements of each array
      for (let i = 0; i < object[key].length; i++) {
        // Check if the array element is a string and contains the search string
        if (
          typeof object[key][i] === "string" &&
          object[key][i].includes(searchString)
        ) {
          foundKey = key;
          break; // Stop iterating if a match is found
        }
      }
    }

    if (foundKey) {
      break; // Stop iterating if a match is found in any array
    }
  }

  return foundKey;
}

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
