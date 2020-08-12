const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./')

//will build out friends model if we need
module.exports = Leaderboard = mongoose.model("Leaderboard", LeaderboardSchema);