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
        
    }
}

export default connect(msp, {logout})(NavBar);