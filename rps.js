const readline = require('readline');
const user1Score = 0;
const user2Score = 0;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question1 = () => {
    return new Promise((resolve, reject) => {
        rl.question('Player 1s Move: ', (answer1) => {
            console.log(`Player 1 has chosen ${answer1}.`)
            resolve(answer1);
        });
    });
}

const question2 = () => {
    return new Promise((resolve, reject) => {
        rl.question('Player 2s Move: ', (answer2) => {
            console.log(`Player 2 has chosen ${answer2}.`)
            resolve(answer2);
        });
    });
}

const game = async() => {
    var answer1 = await question1()
    var answer2 = await question2()
    result(answer1, answer2)
    // question1().then(answer1 => {
    //     return (answer1, question2())
    // }).then((response) => cb(response))
}

const result = (answer1, answer2) => {
   if (answer1 === answer2) {
       console.log("Tie! Rematch time!");
       game();
   } else {
        if (answer1 === "rock" && answer2 === "scissors") {
            console.log("Player 1 wins!");
        } else if (answer1 === "paper" && answer2 === "scissors") {
            console.log("Player 2 wins!");
        } else if (answer1 === "rock" && answer2 === "paper") {
            console.log("Player 2 wins!");
        } else if (answer1 === "scissors" && answer2 === "paper") {
            console.log("Player 1 wins!");
        } else if (answer1 === "paper" && answer2 === "rock") {
            console.log("Player 1 wins!");
        } else {
            console.log("Player 2 wins!");
        }
       rl.close()
   }
}
game();