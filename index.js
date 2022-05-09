const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var foodspawner = Math.floor(Math.random() * 5000); food_c_r = 0; food_c_g = 0; food_c_b = 0;
var x = 0; var y = 0; var socketid; var scores = []; var slen = scores.length; var i = 0;
console.log(foodspawner);

function spawn_food() {
    i = i + 1;
    food_c_r = Math.floor(Math.random() * 255); food_c_g = Math.floor(Math.random() * 255); food_c_b = Math.floor(Math.random() * 255);
    x = Math.floor(Math.random() * 1400);
    y = Math.floor(Math.random() * 700);
    io.emit("Spawn_food_f", x, y, food_c_r, food_c_g, food_c_b);
} 

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


io.on("connection", (socket) => {
    scores.push([socket.id, 0]);
    socket.on("Food_Clicked", (score, food_x, food_y) => {
        socketid = socket.id;
        io.emit("Delete_Food", socketid, score, food_x, food_y, scores, slen);
    });

    socket.on("Add_Score_To_Arr", (i) => {
        scores[i][1]++;
    });
});

setInterval(spawn_food, 1500);


server.listen(3000, () => {
    console.log("Listening *:3000");
});