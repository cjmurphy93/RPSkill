const express = require("express");
const router = express.Router();
const User = require('../../models/User')

router.get("/test", (req, res) => {
  // debugger
  res.json({ msg: "This is the leaderboard route" });
});

router.get('/', (req, res) => {
    User.find()
    .then(users => {
      
    })
})

module.exports = router;