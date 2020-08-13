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

io.on("connect", (socket) => {
    socket.on("join", ({username, game}, callback) => {
        const { player, error } = addPlayer({ id: socket.id, username, game });
        if  (error) return callback(error);
        socket.join(player.game);

        socket.emit("id", socket.id);

        io.to(player.game).emit("gameData", {
            game: player.game,
            players: getPlayersInGame(player.game)
        });
        callback();
    });
    socket.on("disconnect", () => {
        const player = removePlayer(socket.id);
        if (player){
            io.to(player.game).emit("gameData", {
              game: player.game,
              players: getPlayersInGame(player.game),
            });
        }
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

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => console.log(`Server is running on port ${port}`));


app.use("/api/users/", users);
app.use("/api/leaderboard/", leaderboard);
app.use("/api/games/", games);
