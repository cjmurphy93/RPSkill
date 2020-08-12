const express = require("express");
const router = express.Router();
const User = require('../../models/User')

router.get("/test", (req, res) => {
  //  
  res.json({ msg: "This is the leaderboard route" });
});

router.get('/', (req, res) => {
    User.find()
    .sort( {elo: -1} )
    .limit(15)
    .then(users => {
      res.json(users)
    })
    .catch(err => res.status(404).json({ msg: "No leader board found" }));
})

module.exports = router;