import React from 'react';
import NavBar from './NavBar';

export default class YourStats extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div>
                <NavBar/>
                <p>This is the Stats component.</p>
            </div>
        );
    }
}