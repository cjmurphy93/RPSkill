const Game = require('./models/Game');
const User = require('./models/User');
const players = [];

const addPlayer = ({ id, username, game}) => {
    const player = { id, username, game};

    User.findOne({username: username})
    .then((player) => {
        return player
    }).catch((err) => res.status(400).json(err));

    Game.findOne({ name: game})
        .then((ggame) => {
            if (ggame) {
                if (ggame.playerTwo === null) {
                    Game.updateOne({name: ggame.name}, {playerTwo: player});
                }
            } else {
                let newGame = new Game({
                    name: game,
                    playerOne: player
                })
                
                newGame.save().then((game) => res.json(game));
            };
        })
        .catch((err) => res.status(400).json(err))

    players.push(player);    
    return { player };
};

const removePlayer = (id) => {
    const index = players.findIndex((player) => player.id === id);
    if (index !== -1) return players.splice(index, 1)[0];
};

const getPlayer = (id) => players.find((player) => player.id === id);
const getPlayersInGame = (game) => players.filter((player) => player.game === game);

module.exports = { addPlayer, removePlayer, getPlayer, getPlayersInGame}