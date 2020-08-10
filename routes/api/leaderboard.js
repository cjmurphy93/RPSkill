const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  // debugger
  res.json({ msg: "This is the leaderboard route" });
});

router.get('/', (req, res) => {
    
})

module.exports = router;