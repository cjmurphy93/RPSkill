const express = require("express");
const router = express.Router();


router.get("/test", (req, res) => {
  // debugger
  res.json({ msg: "This is the games route" });
});

const games = [
    { id: 100, playerOne: 1, playerTwo: 2, winner: null},
    { id: 200, playerOne: 1, playerTwo: 2, winner: null},
    { id: 300, playerOne: 1, playerTwo: 2, winner: null},
    { id: 400, playerOne: 1, playerTwo: 2, winner: null},
    { id: 500, playerOne: 1, playerTwo: 2, winner: null},
    { id: 600, playerOne: 1, playerTwo: 2, winner: null},
]

router.get("/", (req, res) => {
  res.status(200).send(games);
});

router.get("/:id", (req, res) => {
  const game = games.find((gameObj) => gameObj.id === Number(req.params.id));
  debugger;
  res.status(200).send(game);
});

router.post('/', (req, res) => {
    if (req.query.hasOwnProperty('playerOne' && req.query.hasOwnProperty('playerTwo'))) {
        const newGame = {
          id: Math.floor(Math.random() * 1000),
          playerOne: req.params.playerOne,
          playerTwo: req.params.playerTwo,
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