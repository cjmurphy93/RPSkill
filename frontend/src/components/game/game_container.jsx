import { connect } from 'react-redux';
import io from "socket.io-client";
import GameRoom from "./game";

const msp = (state) => {

    return {
        user: state.session.user
    };
}

const mdp = (dispatch) => {
    return {
        
    }
}

export default connect(msp, mdp)(GameRoom);