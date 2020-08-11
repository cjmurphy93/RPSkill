const mongoose = require("mongoose");
const { schema } = require("./User");
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    playerOne: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    playerTwo: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    winner: {
      type: Schema.Types.ObjectId,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// still working on it
gameSchema.statics.leaderboardTop = function(callback, num) {
    const sorted = this.find({}).sort({})
}


const Game = mongoose.model('Game', gameSchema);