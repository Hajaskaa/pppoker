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

const socketNames = [];

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
  socket.on("hello", (arg, callback) => {
    socketNames.push(arg);
    console.log(arg); // "world"
    callback("success 200");
  });
  socket.on("lobbyTestButtonAction", (arg, callback) => {
    socketNames.push(arg);
    console.log(clients); // "world"
    callback(socketNames);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
