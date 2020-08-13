import React from "react";
import { connect } from "react-redux";
import io from "socket.io-client";

class GameRoom extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
        this.props.setupSocket();
    }

    render() {
        
        return (
            <div>
                Game Room
            </div>
        )
    }
}

export default GameRoom;

