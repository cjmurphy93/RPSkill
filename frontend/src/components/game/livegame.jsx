import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandRock, faHandPaper, faHandScissors } from '@fortawesome/free-solid-svg-icons';

class LiveGame extends React.Component {
    // constructor(props) {
    //     super(props)
    // }
    render() {

        // if some condition (e.g 2 moves received)
        //execute 'some function'

        //if (player counter !== 2) {
            //return null
        // }
        return (
            <>
                <section>
                    <div>
                        <h1 className="live-game-title">Choose Rock, Paper, or Scissors</h1>
                    </div>
                    <div className="flex game-container">
                        <FontAwesomeIcon icon={faHandRock} className="move-icon" />
                        <FontAwesomeIcon icon={faHandPaper} className="move-icon" />
                        <FontAwesomeIcon icon={faHandScissors} className="move-icon" />
                    </div>
                </section>
            </>
        )
    }
}

export default LiveGame;