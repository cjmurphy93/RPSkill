// const Game = require('./models/Game');
const User = require('./models/User');
const players = [];

// const addPlayer = ({ id, username}) => {
//     const player = { id, username};

//     User.findOne({username: username})
//     .then((player) => {
//             Game.findOne({playerTwo: null})
//         .then((ggame) => {
//             if (ggame) {
//                     Game.updateOne({id: ggame.id}, {playerTwo: player});

//             } else {
//                 let newGame = new Game({
//                     playerOne: player
//                 })
                
//                 newGame.save().then((game) => res.json(game));
//             };
//         })
//     }).catch((err) => res.status(400).json(err));

    
//     players.push(player);    
//     return { player };
//     };

class Game {
  constructor(name, player, rounds) {
    this.name = name;
    this.players = [player];
    this.playerOne = player;
    this.playerTwo = null;
    this.p1Wins = 0;
    this.p2Wins = 0;
    this.setRounds = rounds;
    this.currentRound = 1;
    this.winner = null;
    this.moves = {};
  }

  addPlayer(player) {
    if (this.players.length < 2) {
      this.players.push(player);
      this.playerTwo = player;
    }
  }
}

const addPlayer = ({ id, username, game }) => {
    const player = { id, username, game };

    User.findOne({username: username})
    .then((player1) => {
      // Game.findOne({ name: game })
      //   .then((ggame) => {
      //     ;
      //     if (ggame) {
      //       if (ggame.playerTwo === null) {
      //         Game.updateOne({ name: ggame.name }, { playerTwo: player1 });
      //       }
      //     } else {
      //       let newGame = new Game({
      //         name: game,
      //         playerOne: player1
      //       })

      //       newGame.save().then((game) => {
      //         // res.json(game)
      //         console.log(game);
      //       });
      //     }
      //   });
      //   return player1

      }
      
    );
    // .catch((err) => res.status(400).json(err));

    players.push(player);    
    return { player };
};


const removePlayer = (id) => {
    const index = players.findIndex((player) => player.id === id);
    if (index !== -1) return players.splice(index, 1)[0];
};

const getPlayer = (id) => players.find((player) => player.id === id);
const getPlayersInGame = (game) => players.filter((player) => player.game === game);

module.exports = { addPlayer, removePlayer, getPlayer, getPlayersInGame, Game};