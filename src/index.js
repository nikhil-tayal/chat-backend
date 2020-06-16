const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const { addUser, getUser, getUserInRoom, removeUser } = require("./Utils/Users");

const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("Websocket Connected");
  socket.on("joinRoomEventFE", ({ name, room }, callback) => {
    // if room created successfully no error in callback
    socket.broadcast.to(room).emit("newUserAddedBackend");
    addUser({ id: socket.id, name, room });
    socket.join(room);
    callback("Room Created");
  });
  socket.on("sendMessageFromFE", (message, date, name) => {
    let user = getUser(socket.id);
    console.log(user);
    user && io.to(user.room).emit("sendMessageFromBE", message, date, name);
  });

  socket.on("disconnect", () => {
    let user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("sendMessageFromBE", `${user.name} has left`, date, name);
    }
  });
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("HEllo world");
});
