const express = require("express");
const router = express.Router();
const Game = require("../../models/Game");


router.get("/test", (req, res) => {
  //  
  res.json({ msg: "This is the games route" });
});

router.get("/", (req, res) => {
  Game.find()
    .then((games) => {
      //
      res.json(games);
    })
    .catch((err) => res.status(404).json({ nogamesfound: "No games found" }));
  // res.status(200).send(games);
});

router.get("/:id", (req, res) => {
  const game = games.find((gameObj) => gameObj.id === +req.params.id);
   ;
  res.status(200).send(game);
});

router.post('/', (req, res) => {
    if (req.query.hasOwnProperty('playerOne' && req.query.hasOwnProperty('name'))) {
        const newGame = {
          name: req.params.name,
          playerOne: req.params.playerOne,
          winner: null,
        };
    }
    games.push(newGame);
    res.status(200).send(newGame);
})

router.patch('/:id', (req, res) => {
    const game = games.find((gameObj) => gameObj.id === Number(req.params.id));
    Object.assign(game, req.query);
    res.status(200).send(game);
})

module.exports = router;