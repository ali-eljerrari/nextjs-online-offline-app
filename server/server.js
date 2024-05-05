import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io"; // Import Server from socket.io module

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
}); // Use Server from socket.io module

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

// Socket.io event handling
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  // socket.disconnect();
});

server.listen(PORT, () => {
  console.log(`listening on: ${PORT}`);
});
