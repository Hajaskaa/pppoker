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
  const clients = await io.allSockets();

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
    votesData[roomName].splice(indexOfSocket - 1, 0, voteValue);
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

  socket.on("lobbyTestButtonAction", (arg, callback) => {
    console.log(clients);
    console.log("roomNames: " + roomsData);
    // console.log(
    //   "socketNamesAndSocketIDs: " + [...socketNamesAndSocketIDs.entries()]
    // );
    const array = Array.from(socket.rooms);
    console.log(array[1]);
    io.to(array[1]).emit("lobbyTestRoomEvent");
    callback([...socketNamesAndSocketIDs.entries()]);
  });

  socket.on("showVotesButtonAction", (callback) => {
    const currentRoomName = Array.from(socket.rooms)[1];
    io.to(currentRoomName).emit(
      "showVotesFromServer",
      votesData[currentRoomName]
    );

    callback(votesData[currentRoomName]);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    socketNamesAndSocketIDs.delete(socket.client.id);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
