const express = require("express");
const router = express.Router();
const User = require("../../models/User");

// might not need

router.get("/test", (req, res) => {
  //  
  res.json({ msg: "This is the friendlist route" });
});

module.exports = router;