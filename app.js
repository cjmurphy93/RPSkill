const mongoose = require("mongoose");
const express = require("express");
const app = express();
const db = require("./config/keys").mongoURI;
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const server = require('http').createServer(app);
const socketio = require("socket.io");
const io = socketio(server);
const {addPlayer, removePlayer, getPlayer, getPlayersInGame} = require("./gameManager");

const users = require("./routes/api/users");
const leaderboard = require("./routes/api/leaderboard");
const games = require("./routes/api/games");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

server.on('error', err => {
    console.log('Server error:', err);
});

server.listen(port, () => console.log(`Server is running on port ${port}`));

const connections = [];
const players = [];

io.on("connect", (socket) => {
connections.push(socket.id);
console.log("%s sockets currently connected", connections.length)
socket.on('subscribeToPlayer', () => {
  const randomNumber = Math.floor(Math.random()) * 100;
  io.emit('game_id', randomNumber);
})


socket.emit("message", {connections: connections})

socket.on('disconnect', data => {
  players.splice(players.indexOf(socket.id), 1);
  io.sockets.emit('get players', players)
  connections.splice(connections.indexOf(socket.id), 1);
  io.emit('disconnected', socket.id)
  console.log("%s sockets currently connected", connections.length)
});

socket.on('add player', (data, callback) => {
  socket.id = data;

  if (players.indexOf(socket.id) !== -1) {
    callback(false);
  } else {
    players.push(socket.id);
    console.log(players);
    io.sockets.emit("get players", players);
    callback(true);
  }

  if (players.length % 2 === 0) {
    debugger
    io.emit('connected', connections);
    console.log(socket.id);
    io.emit('start game');
  }
})

  // console.log('made socket connection', socket.id);

    let moves = [];
    socket.on('move', function (username, move) {
        moves.push({'player': username, 'move': move});

        if (moves.length === 2) {
            switch (moves[0]["move"]) {
              case "rock": {
                if (moves[1]["move"] === "rock") {
                  io.emit("tie", moves);
                }
                if (moves[1]["move"] === "paper") {
                  io.emit("player 2 wins", moves);
                }
                if (moves[1]["move"] === "scissors") {
                  io.emit("player 1 wins", moves);
                }
                moves = [];
                break;
              }
              case "paper": {
                if (moves[1]["move"] === "rock") {
                  io.emit("player 1 wins", moves);
                }
                if (moves[1]["move"] === "paper") {
                  io.emit("tie", moves);
                }
                if (moves[1]["move"] === "scissors") {
                  io.emit("player 2 wins", moves);
                }
                moves = [];
                break;
              }
              case "scissors": {
                if (moves[1]["move"] === "rock") {
                  io.emit("player 2 wins", moves);
                }
                if (moves[1]["move"] === "paper") {
                  io.emit("player 1 wins", moves);
                }
                if (moves[1]["move"] === "scissors") {
                  io.emit("tie", moves);
                }
                moves = [];
                break;
              }
            }
        }
    });

    // socket.on("disconnect", () => {
    //   console.log('disconnected')        
    //   const player = removePlayer(socket.id);
    //     if (player){
    //         io.to(player.game).emit("gameData", {
    //           game: player.game,
    //           players: getPlayersInGame(player.game),
    //         });
    //     }
    // });
  
      socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static("frontend/build"));
    app.get("/", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });
}



mongoose
.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to MongoDB successfully"))
.catch((err) => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/users/", users);
app.use("/api/leaderboard/", leaderboard);
app.use("/api/games/", games);

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("frontend/build"));
//     app.get("/", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
//     });
// } else {
// }

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "frontend/public/index.html")
// })
