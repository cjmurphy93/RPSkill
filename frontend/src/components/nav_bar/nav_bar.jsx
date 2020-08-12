import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import './nav_bar.css';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
    };

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }
    
    render() {
        const display = !this.props.loggedIn ? (
          <div className="navbar">
            <Link className="white-btn login" to="/login">
              Log In
            </Link>
          </div>
        ) : (
          <div className="navbar">
            <button onClick={this.logoutUser} className="white-btn login-btn">
              Logout
            </button>
          </div>
        );
    return <>
        <nav>
            {display}
        </nav> 
    </>
    } 
}

const msp = (state) => {

  return {
    loggedIn: state.session.isAuthenticated,
  };
}

const mdp = (dispatch) => {
  return {

  }
}

export default connect(msp,mdp)(NavBar);