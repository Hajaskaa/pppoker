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
import leaveRoomHandler from "./src/handlers/leaveRoom.js";
import disconnectSocketHandler from "./src/handlers/disconnectSocket.js";

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
  leaveRoomHandler(io, socket, sharedData);
  disconnectSocketHandler(io, socket, sharedData);
});

server.listen(10000, () => {
  console.log("server running at http://localhost:10000");
});
