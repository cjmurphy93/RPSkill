const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leaderboardSchema = new Schema(
    {
        users: [{ type: Schema.Types.ObjectId, ref: "users"}]
    },
    {
        timestamps: true,
    }
);

module.exports = Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);