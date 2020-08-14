import React from "react";
import WaitingRoom from './waitingroom';
import LiveGame from './livegame';
import "./game.css";

class GameRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
        }
    }

    componentDidMount() {
        const socket = this.props.setupSocket();
        socket.emit("join", this.props.user.username);
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

