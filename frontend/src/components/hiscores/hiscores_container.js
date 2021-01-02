import { connect } from 'react-redux';
import { scores } from '../../actions/session_actions';
import Hiscores from './hiscores';

const msp = state => {
    return {
        users: state.hiscores
    }
}

const mdp = dispatch => {
    return {
        scores: () => dispatch(scores())
    }
}

export default connect(msp, mdp)(Hiscores);