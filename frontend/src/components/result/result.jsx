import React from 'react';
import './result.css';

const Result = ({winner}) => {
        //if (player counter === 2) {
        //return null
        // }
        
        const message = winner === "tie" ? "It's a Tie!" : `${winner} Wins!`;
      
        return (
            <>
                <section>
                    <div className="result-section">
                        <div className="center-container">
                            <h1>Game Results</h1>
                        </div>
                        <div className="players">
                            <div className="playerOne">
                                <h1>{message}</h1>
                                <h2>Player 1</h2>
                                <h2>ELO Change:</h2>
                            </div>
                            <div className="playerTwo">
                                <h2>Player 2</h2>
                                <h2>ELO Change:</h2>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }


export default Result;