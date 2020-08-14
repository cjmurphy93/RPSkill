import React from "react";
import WaitingRoom from './waitingroom';
import LiveGame from './livegame';
import "./game.css";
import subscribeToPlayer from '../app';

class GameRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game_id: null,
        }
        subscribeToPlayer((err, game_id) => {
            debugger
            this.setState({
                game_id
            })
        });
    }

    componentDidMount() {
    };

    // componentWillUnmount() {
    //     //disconnect socket
    // }

    render() {
        return (
            <div>
                {this.state.game_id}
            </div>
        )
    }
};

export default GameRoom;

