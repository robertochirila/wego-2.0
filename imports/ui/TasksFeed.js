import React from 'react';
import NavBar from './NavBar'

export default class TasksFeed extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavBar/>
                <p>This is the TasksFeed component.</p>
            </div>
        );
    }
}