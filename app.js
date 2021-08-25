require("dotenv").config();

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

io.on("connection", (socket) => {
  console.log(`User connected`);

  socket.on("chatting", (data) => {
    console.log(data, `ini keterima di server`);

    io.emit("broadcastMsg", data);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Listening to the PORT: ${PORT}`);
});
