const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var foodspawner = Math.floor(Math.random() * 5000);
var x = 0; var y = 0; var i = 0;
console.log(foodspawner);

function spawn_food() {
    i = i + 1;
    x = Math.floor(Math.random() * 1400);
    y = Math.floor(Math.random() * 750);
    console.log(x, y)
    io.emit("Spawn_food_f", x, y);
} 

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on("connection", (socket) => {
    console.log(socket.id);
    spawn_food();

    socket.on("Food_Clicked", (score, food_x, food_y) => {
        console.log(socket.id, score, food_x, food_y);
    });

});




server.listen(3000, () => {
    console.log("Listening *:3000");
});