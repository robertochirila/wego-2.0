import React from 'react'
import {Meteor} from 'meteor/meteor'
import Projects from "./Projects";

export default class ProjectsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projectsArray: []
        }
    }

    componentDidMount() {
        Meteor.subscribe('projects');
        let myVar = setTimeout(myFunc, 1000);

        function myFunc() {
            let myCursor = projects.find().count();
            console.log(myCursor);
            if (myCursor > 0) {
                console.log("We have a project in the db");
            } else {
                Meteor.call('projects.insert', "Manchester Marathon");
            }

        }

        Tracker.autorun(() => {
            const myProjects = projects.find().fetch();
            this.setState({
                projectsArray: myProjects
            });
        });
    }

    render() {
        return this.state.projectsArray.map(function (projects) {
            return <Projects key={projects._id} projects={projects}/>
        });


    }
}