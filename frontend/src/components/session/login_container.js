import { connect } from 'react-redux';
import { login, clearErrors } from '../../actions/session_actions';

import Login from './login';

const msp = ({ errors }) => {
    return {
        errors: errors.session,
    }
}

const mdp = dispatch => {
    return {
        login: user => dispatch(login(user)),
        removeErrors: () => dispatch(clearErrors())
    }
}

export default connect(msp, mdp)(Login);