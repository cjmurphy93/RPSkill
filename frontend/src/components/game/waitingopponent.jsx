import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import "./game.css";

class WaitingOpponent extends React.Component {
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
                    <div className="flex waiting-container">
                        <h1 className="waiting-message">
                            Please wait while your opponent makes a decision.
                </h1><FontAwesomeIcon icon={faSpinner} className="spinner-icon-waiting" />
                    </div>
                </section>
            </>
        );
    }
}

export default WaitingOpponent;