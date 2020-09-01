import React from 'react';
import './result.css';

const Result = ({winner}) => {
        //if (player counter === 2) {
        //return null
        // }
        
        const message = winner === "tie" ? "It's a Tie!" : `${winner} Wins!`;
      
        return (
            <>
                <section className="section-container">
                    <div className="inner-container">
                        <div className="center-container">
                            Game Results
                        </div>
                        <div className="result-message">{message}</div>
                        <div className="players">
                            <div className="playerOne">
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