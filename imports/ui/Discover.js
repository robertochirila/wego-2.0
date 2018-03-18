import React from 'react';
import ProjectsList from './ProjectsList';
import DiscoverPeople from './DiscoverPeople';
import Navbar from './NavBar';

export default class Discover extends React.Component {
    componentDidMount() {
        Meteor.subscribe('myprofile');
    }

    render() {
        return (
            <div>
                <Navbar/>
                <DiscoverPeople/>
                <ProjectsList/>
            </div>
        );
    }
}