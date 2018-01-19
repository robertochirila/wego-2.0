import React from 'react';
import {Link} from 'react-router-dom';


// NavBar component//

// This component is responsible for navigating the application

export default NavBar = (props) => {
    return (
        <nav>
            <div className="navBar">
                <ul className="main-nav">
                    <li><Link to={"/home"}>Home</Link></li>
                    <li><Link to={"/tasksfeed"}>Tasks Feed</Link></li>
                    <li><Link to={"/yourprofile"}>Your Profile</Link></li>
                    <li><Link to={"/yourstats"}>Your Stats</Link></li>
                    <li><Link to={"/tasks"}>Tasks</Link></li>
                    <li><Link to={"/projects"}>Discover</Link></li>
                </ul>
            </div>
        </nav>
    );
};