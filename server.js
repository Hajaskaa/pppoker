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
const roomNames = [];

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  const filePath = join(__dirname, "index.html");
  res.sendFile(filePath);
});

// app.get("/lobby.html", (req, res) => {
//   const filePath = join(__dirname, "lobby.html");
//   res.sendFile(filePath);
// });

io.on("connection", async (socket) => {
  const clients = await io.allSockets();
  socket.on("socketCreateRoom", (arg, callback) => {
    socketNamesAndSocketIDs.set(socket.client.id, arg);
    console.log(arg);
    const currentRoomName = "room" + socket.client.id;
    socket.join(currentRoomName);
    roomNames.push(currentRoomName);
    callback("success 200");
  });

  socket.on("lobbyTestButtonAction", (arg, callback) => {
    console.log(clients);
    console.log("roomNames: " + roomNames);
    console.log(
      "socketNamesAndSocketIDs: " + [...socketNamesAndSocketIDs.entries()]
    );
    io.to("room" + socket.client.id).emit("lobbyTestRoomEvent");
    callback([...socketNamesAndSocketIDs.entries()]);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
    socketNamesAndSocketIDs.delete(socket.client.id);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
