const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userTestSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      index: { unique: true },
    },
    email: {
      type: String,
      required: true,
      index: { unique: true },
    },
    password: {
      type: String,
      required: true,
    },
    performance: {
      type: [String],
      default: [],
    },
    friends: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    elo: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const users = [
  {
    id: 1,
    username: "hurricanenara",
    email: "hello@hello.com",
    password: "password1234",
    performance: ["W", "L", "L", "W"],
    friends: [],
  },
  {
    id: 2,
    username: "blue",
    email: "hello2@hello.com",
    password: "password1234",
    performance: ["W", "W", "W", "W"],
    friends: [],
  },
  {
    id: 3,
    username: "yellow",
    email: "hello3@hello.com",
    password: "password1234",
    performance: ["L", "L", "L", "L"],
    friends: [],
  },
  {
    id: 4,
    username: "red",
    email: "hello4@hello.com",
    password: "password1234",
    performance: ["L", "W", "W", "L"],
    friends: [],
  },
  {
    id: 5,
    username: "green",
    email: "hello5@hello.com",
    password: "password1234",
    performance: ["W", "L", "L", "L"],
    friends: [],
  },
  {
    id: 6,
    username: "grey",
    email: "hello6@hello.com",
    password: "password1234",
    performance: ["L", "W", "W", "W"],
    friends: [],
  },
];

//model methods
// userSchema.statics.all = function (callback) {
//   return this.find({});
// };

// userSchema.statics.leaderboardTop = function (callback, num) {
//   this.aggregate([
//     { $unwind: "$performance" },
//     { $group: { _id: "$performance", count: { $sum: 1 } } },
//     { $sort: { _id: 1 } },
//   ]);
// };

//document methods

// working on it
// userSchema.statics;

const UserTest = mongoose.model("UserTest", userTestSchema);

UserTest.create({
  id: 1,
  username: "hurricanenara",
  email: "hello@hello.com",
  password: "password1234",
  performance: ["W", "L", "L", "W"],
  friends: [],
});

let firstUser = UserTest.find({});
console.log(firstUser)

module.exports = UserTest;
