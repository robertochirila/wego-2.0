import React from 'react';
import NavBar from './NavBar';

export default class YourProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavBar/>
                <p>This is the Profile component.</p>
            </div>
        );
    }
}