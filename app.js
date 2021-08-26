if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const router = require("./routes/");
const errorHandler = require("./middlewares/errorHandler");
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(router);

app.use(errorHandler);

let users = [];
let rooms = [];

/*
io.emit --> Broadcast to everyone including self
socket.broadcast.emit --> Broadcast to everyone not including self
socket.emit --> Broadcast only to self
*/

io.on("connection", (socket) => {
  // chatting feature
  socket.on("chatting", (data) => {
    io.emit("broadcastMsg", data);
  });

  // populate who is in your room
  socket.on("logining", (user) => {
    users.push(user);

    io.emit("broadcastUser", users);

    socket.emit("getRooms", rooms);
    socket.emit("updatedRooms", rooms);
  });

  // create room to play with each other
  socket.on("createRoom", (data) => {
    let room = {
      roomName: data.roomName,
      maxPlayer: data.maxPlayer,
      maxPoint: data.maxPoint,
      users: [],
      admin: data.admin,
    };
    rooms.push(room);

    io.emit("updatedRooms", rooms);
  });

  // how to join room
  socket.on("joinRoom", (data) => {
    socket.join(data.roomName, () => {
      let roomIndex = rooms.findIndex((i) => i.roomName === data.roomName);
      rooms[roomIndex].users.push(data.nickname);

      console.log("detailRoom", rooms[roomIndex]);
      io.sockets.to(data.roomName).emit("detailRoom", rooms[roomIndex]);
    });
  });
});

httpServer.listen(PORT, () => {
  console.log(`Listening to the PORT: ${PORT}`);
});
