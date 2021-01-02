import { connect } from 'react-redux';
import { scores, updateScore } from '../../actions/session_actions';
import Hiscores from './hiscores';

const msp = state => {
    return {
        users: state.hiscores
    }
}

const mdp = dispatch => {
    return {
        scores: () => dispatch(scores()),
        updateScore: username => dispatch(updateScore(username)),
    }
}

export default connect(msp, mdp)(Hiscores);