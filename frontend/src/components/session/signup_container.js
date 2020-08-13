import { connect } from 'react-redux';
import { signup, login, clearErrors } from '../../actions/session_actions';

import SignUp from './signup';

const msp = (state) => {

    return {
        errors: state.errors.session,
    }
}
const mdp = (dispatch) => {
    return {
        signup: user => dispatch(signup(user)),
        login: user => dispatch(login(user)),
        removeErrors: () => dispatch(clearErrors())
    };
};

export default connect(msp, mdp)(SignUp);