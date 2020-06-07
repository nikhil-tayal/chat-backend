const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);

const io=socketio(server)

io.on("connection",(socket)=>{
  console.log("Websocket Connected")
  socket.broadcast.emit("newUserAddedBackend")
  socket.on("joinRoomEventFE" , ({name,room} , callback)=>{
    // if room created successfully no error in callback 
    console.log(name,room)
    callback("Room Created")
  })
  socket.on("sendMessageFromFE" , (message , date , name)=>{
    io.emit("sendMessageFromBE" , message , date , name)
  })
})

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.get("/" , (req,res)=>{
  res.send("HEllo world")
})
