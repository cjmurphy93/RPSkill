import { connect } from 'react-redux';
import { updateScore } from '../../actions/session_actions';
import Result from './result';

const msp = state => {
    return {
    }
}

const mdp = dispatch => {
    debugger
    return {
        updateScore: username => dispatch(updateScore(username)),
    }
}

export default connect(msp, mdp)(Result);