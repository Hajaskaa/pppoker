import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createServer } from "node:http";
import { Server } from "socket.io";
import * as path from "path";
import createRoomHandler from "./src/handlers/createRoom.js";
import joinRoomHandler from "./src/handlers/joinRoom.js";
import voteSocketHandler from "./src/handlers/voteSocket.js";
import showVotesHandler from "./src/handlers/showVotes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);

// const setHeaders = function (req, res, next) {
//   res.set("macska", "cica");
//   next();
// };
// app.use(setHeaders);

// app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  const filePath = join(__dirname, "public", "index.html");
  // const mimeType = getMimeType(filePath);
  // res.setHeader("Content-Type", mimeType);
  res.sendFile(filePath);
});

// app.get("/:path*", function (req, res) {
//   const filePath = join(__dirname, "public", "index.html");

//   res.sendFile(filePath);
// });

// function getMimeType(filePath) {
//   const extname = path.extname(filePath).toLowerCase();
//   switch (extname) {
//     case ".html":
//       return "text/html";
//     case ".css":
//       return "text/css";
//     case ".js":
//       return "application/javascript";
//     case ".json":
//       return "application/json";
//     // Add more cases as needed
//     default:
//       return "application/octet-stream"; // Default MIME type for binary files
//   }
// }
const socketNamesAndSocketIDs = new Map();
const roomsData = {};
const votesData = {};

io.on("connection", async (socket) => {
  const sharedData = {
    socketId: socket.id,
    socketNamesAndSocketIDs: socketNamesAndSocketIDs,
    roomsData: roomsData,
    votesData: votesData,
  };

  createRoomHandler(io, socket, sharedData);
  joinRoomHandler(io, socket, sharedData);
  voteSocketHandler(io, socket, sharedData);
  showVotesHandler(io, socket, sharedData);

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
      io.to(roomName).emit("showVotesFromServer", votesData[roomName]);
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

server.listen(10000, () => {
  console.log("server running at http://localhost:10000");
});
