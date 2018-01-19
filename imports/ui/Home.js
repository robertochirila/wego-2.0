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
                <div className="container">
                    <div className="row">
                        <div className="home-page">
                            <p>This is the Home component.</p>
                            <button type="button" className="btn btn-danger" onClick={this.onLogout.bind(this)}>Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}