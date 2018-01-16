import React from 'react'
import {Meteor} from 'meteor/meteor';

export default class Projects extends React.Component {


    componentDidMount() {
        Meteor.subscribe('projects');
    };

    onEnrol(e) {
        e.preventDefault();
        Meteor.call('projects.update', this.props.projects._id, Meteor.userId());
    }

    render() {
        return (
            <div key={this.props.projects._id}>
                <p>{this.props.projects.projectName}</p>
                <p>{this.props.projects.projectDuration}</p>
                <p>{this.props.projects.people}</p>
                <button onClick={this.onEnrol.bind(this)}>Enrol in Project</button>
                <p>This is the projects component.</p>
            </div>
        );
    }
}