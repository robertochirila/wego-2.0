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
                <div className="col-4">
                    <div className="box">
                        <h1>Project Card</h1>
                        <div className="project-card">
                            <div className="project-photo">
                                <figure className="project-photo-figure">
                                    <img src="../../img/icon.png" className="round-photo"/>
                                </figure>
                            </div>
                            <div className="project-description">
                                <h5>{this.props.projects.projectName}</h5>
                                <h5>{this.props.projects.projectDuration}</h5>
                                <h5>{this.props.projects.people}</h5>
                            </div>
                            <div className="project-button">
                                <button className="btn enrol" onClick={this.onEnrol.bind(this)}>Enrol</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}