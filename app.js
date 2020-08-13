const mongoose = require("mongoose");
const express = require("express");
const http = require('http');
const db = require("./config/keys").mongoURI;
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const users = require("./routes/api/users");
const leaderboard = require("./routes/api/leaderboard");
const games = require("./routes/api/games");
const socketIO = require("socket.io");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;
const server = http.createServer(app);

const io = socketIO(server);

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

mongoose
.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to MongoDB successfully"))
.catch((err) => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/users/", users);
app.use("/api/leaderboard/", leaderboard);
app.use("/api/games/", games);

io.on('connection', function (socket) {
    console.log('made socket connection', socket.id);

    socket.on('disconnect', () => {
        console.log('disconnected')
    })

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    })
});

