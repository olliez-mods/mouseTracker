const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var robot = require("robotjs");

const PORT = 3008;

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
console.log(robot.getScreenSize());
io.on("connection", (socket) => {

    socket.emit("resizeCanv", robot.getScreenSize());

    setInterval(function() {
        var mouse = robot.getMousePos();
        socket.emit("mouseUpdate", mouse);
    }, 16);
});

server.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});