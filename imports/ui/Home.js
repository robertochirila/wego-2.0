import React from 'react';
import NavBar from './NavBar';
import {Accounts} from 'meteor/accounts-base';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    onLogout() {
        Accounts.logout();
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <NavBar/>
                <p>This is the Home component.</p>
                <button onClick={this.onLogout.bind(this)}>Logout</button>
            </div>
        );
    }
}