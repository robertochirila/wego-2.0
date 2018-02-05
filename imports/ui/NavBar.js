import React from 'react';
import {Link} from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import {Session} from 'meteor/session';

const history = createHistory();


// NavBar component//

// This component is responsible for navigating the application

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    onSubmit(e) {
        const userEmail = this.refs.email.value;
        Session.set("object", userEmail);
        console.log(userEmail);
        this.props.history.push('/displayUserProfile');
    }

    render() {
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
};