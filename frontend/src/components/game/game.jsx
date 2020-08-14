import React from "react";
import WaitingRoom from './waitingroom';
import LiveGame from './livegame';
import "./game.css";

class GameRoom extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.setupSocket();
        //emit "join" username
    }

    componentWillUnmount() {
        //disconnect socket
    }

    render() {
        return (
            <div>
                    <WaitingRoom />
                    <LiveGame />
            </div>
        )
    }
}

export default GameRoom;

