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
    friends: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    elo: {
      type: Number,
      default: 1000,
    }
  },
  {
    timestamps: true,
  }
);

const usersArr = [
  {
    username: "purple",
    email: "hello@hello.com",
    password: "password1234",
    score: 10,
  },
  {
    username: "blue",
    email: "hello2@hello.com",
    password: "password1234",
    score: 8,
  },
  {
    username: "yellow",
    email: "hello3@hello.com",
    password: "password1234",
    score: 2,
  },
  {
    username: "red",
    email: "hello4@hello.com",
    password: "password1234",
    score: 0,
  },
  {
    username: "green",
    email: "hello5@hello.com",
    password: "password1234",
    score: 5,
  },
  {
    username: "grey",
    email: "hello6@hello.com",
    password: "password1234",
    score: 5,
  },
];

const User = mongoose.model("User", userSchema);

User.remove({});

// User.find(function(err, users) {
//   if (err) {
//     console.log(err)
//   } else {
//     users.forEach(user => {
//       console.log(user.performance)
//     })
//   }
// })

// User.insertMany(usersArr, function(err) {
//     if (err) {
//         debugger
//         console.log(err)
//     } else {
//         console.log("user docs inserted")
//     }
// })

module.exports = User;
