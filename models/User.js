const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      // unique: true
    },
    email: {
      type: String,
      required: true,
      // unique: true
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
      type: [],
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

const usersArr = [
  {
    username: "hurricanenara",
    email: "hello@hello.com",
    password: "password1234",
    performance: [1, 1, 1, 1],
  },
  {
    username: "blue",
    email: "hello2@hello.com",
    password: "password1234",
    performance: [0, 0, 0, 0],
  },
  {
    username: "yellow",
    email: "hello3@hello.com",
    password: "password1234",
    performance: [0, 0, 1, 1],
  },
  {
    username: "red",
    email: "hello4@hello.com",
    password: "password1234",
    performance: [1, 1, 0, 0],
  },
  {
    username: "green",
    email: "hello5@hello.com",
    password: "password1234",
    performance: [1, 0, 1, 0],
  },
  {
    username: "grey",
    email: "hello6@hello.com",
    password: "password1234",
    performance: [0, 1, 0, 1],
  },
];

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

User.remove({});

User.find(function(err, users) {
  if (err) {
    console.log(err)
  } else {
    users.forEach(user => {
      console.log(user.performance)
    })
  }
})

// User.insertMany(usersArr, function(err) {
//     if (err) {
//         debugger
//         console.log(err)
//     } else {
//         console.log("user docs inserted")
//     }
// })


module.exports = User;
