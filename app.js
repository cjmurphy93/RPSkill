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
const {addPlayer, removePlayer, getPlayer, getPlayersInGame, Game} = require("./gameManager");

const users = require("./routes/api/users");
const leaderboard = require("./routes/api/leaderboard");
const games = require("./routes/api/games");

const User = require('./models/User');

app.use("/", express.static(path.join(__dirname, "/client/build")));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server is running on port ${port}`));

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("frontend/build"));
//     app.get("/", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
//     });
// } else {
// }

const connections = [];
const gameRooms = {};
const standbyUsers = [];

io.on("connect", (socket) => {
  console.log('made socket connection', socket.id); 
  connections.push(socket.id);
  // console.log(`${connections.length} connections`)  
  
  socket.on("join", ({username, game, rounds}, callback) => {
    standbyUsers.push(username);
    console.log(username, "joined the room")
    
    socket.on('chat message', data => {
      console.log(data);
      // const { id } = socket.id;
      io.emit('chat message', (data));
      io.emit('join', {standbyUsers});
      // socket.broadcast.emit('chat message', msg);
    })

    socket.on("add points", username => {
      console.log(username);
      User.updateOne({ username: username },
        { $inc: { elo: 200 } }
      )
      .then(user => {
        console.log(`points added to ${username}`)
      })
    })

    User.findOne({ username: username })
      .then((user) => {
        socket.join(game);
        const gameRoom = gameRooms[game];
        if (gameRoom) {
          gameRoom.addPlayer(user);
        } else {
          gameRooms[game] = new Game(game, user, rounds);
        }

        socket.emit("gameData", {
          game,
          players: gameRooms[game].players
        });

        if (gameRooms[game].players.length === 2) {
          io.to(game).emit("game start", {
            game,
            players: [gameRooms[game].players[0].username, gameRooms[game].players[1].username]
          });
        }

      });
    });

    socket.on('move', ({username, move, game}) => {
      let gr = gameRooms[game];
      let moves = gameRooms[game].moves;
      let round = gameRooms[game].currentRound;
      moves[round] = moves[round] || [];
        moves[round].push({'player': username, 'move': move});
      console.log(moves);
        if (moves[round].length === 2) {
            switch (moves[round][0]["move"]) {
              case "rock": {
                if (moves[round][1]["move"] === "rock") {
                  io.to(game).emit("tie", moves);
                }
                if (moves[round][1]["move"] === "paper") {
                  if (moves[round][1]["player"] === gr.playerOne.username) gr.p1Wins += 1;
                  if (moves[round][1]["player"] === gr.playerTwo.username) gr.p2Wins += 1;

                  if (gr.p1Wins > (gr.setRounds / 2)) {
                    io.to(game).emit("game over", {winner: gr.playerOne, loser: gr.playerTwo})
                  } else if (gr.p2Wins > (gr.setRounds / 2)) {
                    io.to(game).emit("game over", { winner: gr.playerTwo, loser: gr.playerOne })
                  } else {
                    io.to(game).emit("player 2 wins", moves);
                  }
                }

                if (moves[round][1]["move"] === "scissors") {
                  if (moves[round][0]["player"] === gr.playerOne.username) gr.p1Wins += 1;
                  if (moves[round][0]["player"] === gr.playerTwo.username) gr.p2Wins += 1;

                  if (gr.p1Wins > (gr.setRounds / 2)) {
                    io.to(game).emit("game over", { winner: gr.playerOne, loser: gr.playerTwo })
                  } else if (gr.p2Wins > (gr.setRounds / 2)) {
                    io.to(game).emit("game over", { winner: gr.playerTwo, loser: gr.playerOne })
                  } else {
                  io.to(game).emit("player 1 wins", moves);
                  }
                }
                gr.currentRound += 1;
                break;
              }
              case "paper": {
                if (moves[round][1]["move"] === "rock") {
                  if (moves[round][0]["player"] === gr.playerOne.username) gr.p1Wins += 1;
                  if (moves[round][0]["player"] === gr.playerTwo.username) gr.p2Wins += 1;

                  if (gr.p1Wins > (gr.setRounds / 2)) {
                    io.to(game).emit("game over", { winner: gr.playerOne, loser: gr.playerTwo })
                  } else if (gr.p2Wins > (gr.setRounds / 2)) {
                    io.to(game).emit("game over", { winner: gr.playerTwo, loser: gr.playerOne })
                  } else {
                    io.to(game).emit("player 1 wins", moves);
                  }
                }
                if (moves[round][1]["move"] === "paper") {
                  io.to(game).emit("tie", moves);
                }
                if (moves[round][1]["move"] === "scissors") {
                  if (moves[round][1]["player"] === gr.playerOne.username) gr.p1Wins += 1;
                  if (moves[round][1]["player"] === gr.playerTwo.username) gr.p2Wins += 1;

                  if (gr.p1Wins > (gr.setRounds / 2)) {
                    io.to(game).emit("game over", { winner: gr.playerOne, loser: gr.playerTwo })
                  } else if (gr.p2Wins > (gr.setRounds / 2)) {
                    io.to(game).emit("game over", { winner: gr.playerTwo, loser: gr.playerOne })
                  } else {
                    io.to(game).emit("player 2 wins", moves);
                  }
                }
                gr.currentRound += 1;
                break;
              }
              case "scissors": {
                if (moves[round][1]["move"] === "rock") {
                  if (moves[round][1]["player"] === gr.playerOne.username) gr.p1Wins += 1;
                  if (moves[round][1]["player"] === gr.playerTwo.username) gr.p2Wins += 1;

                  if (gr.p1Wins > (gr.setRounds / 2)) {
                    io.to(game).emit("game over", { winner: gr.playerOne, loser: gr.playerTwo })
                  } else if (gr.p2Wins > (gr.setRounds / 2)) {
                    io.to(game).emit("game over", { winner: gr.playerTwo, loser: gr.playerOne })
                  } else {
                    io.to(game).emit("player 2 wins", moves);
                  }
                }
                if (moves[round][1]["move"] === "paper") {
                  if (moves[round][0]["player"] === gr.playerOne.username) gr.p1Wins += 1;
                  if (moves[round][0]["player"] === gr.playerTwo.username) gr.p2Wins += 1;

                  if (gr.p1Wins > (gr.setRounds / 2)) {
                    io.to(game).emit("game over", { winner: gr.playerOne, loser: gr.playerTwo })
                  } else if (gr.p2Wins > (gr.setRounds / 2)) {
                    io.to(game).emit("game over", { winner: gr.playerTwo, loser: gr.playerOne })
                  } else {
                    io.to(game).emit("player 1 wins", moves);
                  }
                }
                if (moves[round][1]["move"] === "scissors") {
                  io.to(game).emit("tie", moves);
                }
                gr.currentRound += 1;
                break;
              }
            }

        }
    });

    socket.on("disconnect", () => {
      console.log('disconnected')
      connections.pop();
      console.log(`${connections.length} connections`)
      const player = removePlayer(socket.id);
        if (player){
            io.to(player.game).emit("gameData", {
              game: player.game,
              players: getPlayersInGame(player.game),
            });
        }
    });
  
    //   socket.on('chat', (data) => {
    //     io.sockets.emit('chat', data);
    // });
    // socket.on("sendMessage", data => {
    //   io.socket.emit('receiveMessage', data)
    // })
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



