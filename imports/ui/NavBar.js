import React from 'react';
import {Link} from 'react-router-dom';


// NavBar component//

// This component is responsible for navigating the application

export default NavBar = (props) => {
    return (
        <div>
            <p>This is my Navbar component.</p>
            <ul>
                <li><Link to={"/home"}>Home</Link></li>
                <li><Link to={"/tasksfeed"}>Tasks Feed</Link></li>
                <li><Link to={"/yourprofile"}>Your Profile</Link></li>
                <li><Link to={"/yourstats"}>Your Stats</Link></li>
                <li><Link to={"/tasks"}>Tasks</Link></li>
            </ul>
        </div>
    );
};