const mongoose = require("mongoose");
const { userSchema } = require("./User");
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    name: {
      type: String
    },
    playerOne: {
      // type: Schema.Types.ObjectId,
      // ref: "users",
      type: String,
      required: true
    },
    playerTwo: {
      // type: Schema.Types.ObjectId,
      // ref: "users",
      type: String,
      default: null,
    },
    winner: {
      // type: Schema.Types.ObjectId,
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// still working on it
// gameSchema.statics.leaderboardTop = function(callback, num) {
//     const sorted = this.find({}).sort({})
// }


const Game = mongoose.model('Game', gameSchema);

module.exports = Game;