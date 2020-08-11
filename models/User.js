const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      index: { unique: true}
    },
    email: {
      type: String,
      required: true,
      index: { unique: true }
    },
    password: {
      type: String,
      required: true,
    },
    performance: {
      type: ["W", "L"],
      default: [],
    },
    friends: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    elo: {
      type: Number
    }
  },
  {
    timestamps: true,
  }
);

//model methods
userSchema.statics.all = function(callback) {
  return this.find({});
}

userSchema.statics.leaderboardTop = function(callback, num) {
  this.aggregate([
    { $unwind: "$performance" },
    { $group: { _id: "$performance", count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);
}

//document methods

// working on it
userSchema.statics

const User = mongoose.model("User", userSchema);
module.exports = User;
