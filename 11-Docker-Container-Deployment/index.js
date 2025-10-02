import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.get("/", (req, res) => {
  res.send("<h1>Hello from Realtime Socket Chat Server</h1>");
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  // Join a room
  socket.on("join", (roomId) => {
    socket.join(roomId);
  });
  socket.on("leave", (roomId) => {
    socket.leave(roomId);
  });

//   Broadcast to room 
  socket.on("send", (message) => {
    console.log(message)
    socket.to(message.room).emit("message", message);
  });
});

server.listen(5050, () => {
  console.log("listening on *:5050");
});
