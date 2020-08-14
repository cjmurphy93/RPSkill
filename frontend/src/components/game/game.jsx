import React from "react";
import WaitingRoom from './waitingroom';
import LiveGame from './livegame';
import "./game.css";

class GameRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            game_id: null,
            socket: null
        }
    }

    componentDidMount() {
        const clientSocket = this.props.setupSocket();
        debugger
        this.setState({socket: clientSocket});
        debugger
        this.state.socket.emit("join", this.props.user.username);
        //emit "join" username
    }

    componentWillUnmount() {
        //disconnect socket
    }

    render() {
        if (this.state.socket !== null) {
            this.state.socket.on('connected', (data) => {
                this.game_id = data.game_id;
            })
        }
        debugger
        return (
            <div>
                    <WaitingRoom />
                    <LiveGame />
            </div>
        )
    }
}

export default GameRoom;

