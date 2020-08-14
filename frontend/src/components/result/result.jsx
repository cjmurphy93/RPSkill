import React from 'react';
import './result.css';


class Result extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        //if (player counter === 2) {
        //return null
        // }
        return (
            <>
                <section>
                    <div className="center-container">
                        <h1>Game Results</h1>
                    </div>
                    <div className="flex space-evenly">
                        <div>
                            <h2>Player 1</h2>
                            <h2>ELO Change:</h2>
                        </div>
                        <div>
                            <h2>Player 2</h2>
                            <h2>ELO Change:</h2>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default Result;