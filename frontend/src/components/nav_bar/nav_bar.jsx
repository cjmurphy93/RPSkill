import React from 'react';
import { Link } from 'react-router-dom';
import './nav_bar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

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
              <Link className="white-btn home-btn" to="/">
                Home
              </Link>
            </div>
            <div className="navbar">
              <Link className="linkedin" to="/aboutus">
                <FontAwesomeIcon icon={faLinkedin} className="linkedin-img" />
              </Link>
              <Link className="white-btn login" to="/login">
                Log In
              </Link>
            </div>
          </div>
        ) : (
          <div className="navbar">
            <div className="navbar">
              <Link className="white-btn home-btn" to="/">
                Home
              </Link>
            </div>
            <div className="navbar">
              <Link className="linkedin" to="/aboutus">
                <FontAwesomeIcon icon={faLinkedin} className="linkedin-img" />
              </Link>
              <button
                onClick={this.logoutUser}
                className="white-btn logout-btn"
              >
                Logout
              </button>
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

export default NavBar;