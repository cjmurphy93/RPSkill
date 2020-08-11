import React from 'react';
import { Link } from 'react-router-dom';

const navBar = () => {
    
        const display = (
        <div>
            <Link className="white-btn login" to="/login">Log In</Link>
        </div>
        )
    return <>
        <div>
            {display}
        </div> 
    </>
        
}

export default navBar;
