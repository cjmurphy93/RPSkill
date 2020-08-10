const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeaderboardSchema = new Schema(
    {
        Board: [Users]
    },
    {
        timestamps: true,
    }
);

module.exports = Leaderboard = mongoose.model("Leaderboard", LeaderboardSchema);