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
    socketNamesAndSocketIDs.set(socket.id, arg);
    const currentRoomName = "room" + socket.id;
    socket.join(currentRoomName);
    roomNames.push(currentRoomName);

    const link = "http://localhost:3000/" + currentRoomName;

    callback("success 200 " + link);
  });

  socket.on("lobbyTestButtonAction", (arg, callback) => {
    console.log(clients);
    console.log("roomNames: " + roomNames);
    // console.log(
    //   "socketNamesAndSocketIDs: " + [...socketNamesAndSocketIDs.entries()]
    // );
    io.to("room" + socket.client.id).emit("lobbyTestRoomEvent");
    callback([...socketNamesAndSocketIDs.entries()]);
  });

  socket.on("joinRoomButtonAction", (roomIdValue, callback) => {
    socket.join(roomIdValue);
    callback(
      "Sikeresen csatlakoztál a " + roomIdValue + " szobához!Zoli literal god."
    );
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    socketNamesAndSocketIDs.delete(socket.client.id);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
