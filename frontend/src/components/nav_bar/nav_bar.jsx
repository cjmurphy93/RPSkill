import React from 'react';
import { Link } from 'react-router-dom';

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
            <Link className="white-btn login-btn" to="/login">
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

export default NavBar;
