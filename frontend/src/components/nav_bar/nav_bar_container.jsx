import { connect }  from 'react-redux';
import NavBar from './nav_bar';
import { logout } from '../../actions/session_actions';


const msp = (state) => {
    
     return {
       loggedIn: state.session.isAuthenticated,
     };
}

const mdp = (dispatch) => {
    return {
        logout: dispatch(logout())
    }
}

export default connect(msp, mdp)(NavBar);