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
    
    linkedin(e){
      e.preventDefault();
      window.open('https://www.linkedin.com/in/naraskim/');
      window.open('https://www.linkedin.com/in/austinhokunwong/');
      window.open('https://www.linkedin.com/in/connor-murphy-085a7238/')
    }

    render() {
        const display = !this.props.loggedIn ? (
          <div className="navbar">
            <div className="navbar">
              <Link className="white-btn home-btn" to="/">Home</Link>
            </div>
            <div className="navbar">
              <a onClick={(e) => this.linkedin(e)} className="linkedin"><img className="linkedin-img" src="https://www.iconsdb.com/icons/preview/white/linkedin-xxl.png" alt=""/></a>
              <Link className="white-btn login" to="/login">Log In</Link>
            </div>
          </div>
        ) : (
          <div className="navbar">
              <div className="navbar">
                <Link className="white-btn home-btn" to="/">Home</Link>
              </div>
              <div className="navbar">
                <a className="linkedin"><img className="linkedin-img" src="https://www.iconsdb.com/icons/preview/white/linkedin-xxl.png" alt="" /></a>
                <button onClick={this.logoutUser} className="white-btn logout-btn">Logout</button>
              </div>
              
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
    logout: () => dispatch(logout())
  }
}

export default connect(msp,mdp)(NavBar);