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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World"));
server.on('error', err => {
    console.log('Server error:', err);
});

// io.on('connection', socket => {
//     console.log("socket connection made", socket.id)

//     socket.on("disconnect", () => {
//         console.log("Disconnected")
//     })
// })


// server.listen(8080, () => {
//     console.log('RPS started on 8080')
// })

server.listen(port, () => console.log(`Server is running on port ${port}`));

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("frontend/build"));
//     app.get("/", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
//     });
// } else {
// }

app.use(express.static("chat"))
// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "frontend/public/index.html")
// })
const connections = [];
const gameRooms = {};

io.on("connect", (socket) => {
  console.log('made socket connection', socket.id); 

  connections.push(socket.id);
  if (connections.length % 2 !== 0 ){ //&& youre the last person to connect?
    const game_id = Math.floor(Math.random() * 1000) 
    io.emit('connected', {socket_id: socket.id, game_id: game_id})
  } else {
    io.emit("start_game") //should this be on odd numbers? e.g start game can provide componnent state obj 'if your game id is 'x', 
    //trigger re-render to game input child component
    
    //on game emit component, both players emit move with game id
    //once moves queue with respect to that game id === 2, run
    //rps function that determines winner
    //using winner / loser state, modify currently logged in users points
    //render result page (elo gain / loss + win / loss may will need to be provided to reroute) componentDidDismount will cover removing
    //players from connections, preserving functionality of "connect"
  
  }


<<<<<<< HEAD
  // socket.on("join", ({username, game}, callback) => {
  //       const { player, error } = addPlayer({ id: socket.id, username, game });
  //       if  (error) return callback(error);
  //       socket.join(player.game);

  //       socket.emit("id", socket.id);

  //       io.to(player.game).emit("gameData", {
  //           game: player.game,
  //           players: getPlayersInGame(player.game)
  //       });

  //       if (getPlayersInGame(player.game).length === 2) {
  //         io.to(player.game).emit("game start", {
  //           game: player.game,
  //           players: getPlayersInGame(player.game),
  //         });
  //       }
  //       callback();
  //   });
=======
  socket.on("join", ({username, game}, callback) => {
    User.findOne({ username: username })
      .then((user) => {
        socket.join(game);
        const gameRoom = gameRooms[game];
        if (gameRoom) {
          gameRoom.addPlayer(user);
        } else {
          gameRooms[game] = new Game(game, user);
        }

        socket.emit("gameData", {
          game,
          players: gameRooms[game].players
        });

        if (gameRooms[game].players.length === 2) {
          io.to(game).emit("game start");
        }

      });
    
        // const { player, error } = addPlayer({ id: socket.id, username, game });
        // if (error) return callback(error);
        // socket.join(game);

        // socket.emit("id", socket.id);
        // debugger;

        // socket.emit("gameData", {
        //     game: player.game,
        //     players: getPlayersInGame(player.game)
        // });

        // if (getPlayersInGame(game).length === 2) {
        //   socket.emit("game start");
        // }
        // callback();
    });
>>>>>>> 792d4658c238745c6228ffce6aabe2c3c80cff8d

      // socket.on("join", ({ username }, callback) => {
      //   const { player, error } = addPlayer({ id: socket.id, username});
      //   if (error) return callback(error);
      //   socket.join(player.game);

      //   socket.emit("id", socket.id);

      //   io.to(player.game).emit("gameData", {
      //     game: player.game,
      //     players: getPlayersInGame(player.game),
      //   });

      //   if (getPlayersInGame(player.game).length === 2) {
      //     io.to(player.game).emit("game start", {
      //       game: player.game,
      //       players: getPlayersInGame(player.game),
      //     });
      //   }
      //   callback();
      // });

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

    socket.on("disconnect", () => {
      console.log('disconnected')        
      const player = removePlayer(socket.id);
        if (player){
            io.to(player.game).emit("gameData", {
              game: player.game,
              players: getPlayersInGame(player.game),
            });
        }
    });
  
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



