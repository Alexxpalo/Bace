const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var foodspawner = Math.floor(Math.random() * 5000);
var x = 0; var y = 0; var i = 0; var socketid;
console.log(foodspawner);

function spawn_food() {
    i = i + 1;
    x = Math.floor(Math.random() * 1400);
    y = Math.floor(Math.random() * 700);
    io.emit("Spawn_food_f", x, y);
} 

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


io.on("connection", (socket) => {

    socket.on("Food_Clicked", (score, food_x, food_y) => {
        socketid = socket.id;
        io.emit("Delete_Food", socketid, score, food_x, food_y);
    });

});

setInterval(spawn_food, 1500);


server.listen(3000, () => {
    console.log("Listening *:3000");
});