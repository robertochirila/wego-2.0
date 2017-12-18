import React from 'react';
import NavBar from './NavBar';
import {Meteor} from 'meteor/meteor';

export default class YourStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ""
        };
    }

    componentDidMount() {
        // checks if I have any stats in the db
        // if so, it updates the value of each input field
        // after retrieving the values from the db
        Tracker.autorun(() => {
            console.log("subscribed to the stats db");
            console.log("YourStats component is mounted !");
            //Meteor.subscribe('tasks');
            Meteor.subscribe('stats');
            console.log(stats.find().count());
            if (stats.find().count() > 0) {
                console.log("You have a stats collection");
                let myCursor = stats.findOne({userId: Meteor.userId()});
                this.refs.creativity.value = myCursor.skills.creativity;
                this.refs.fitness.value = myCursor.skills.fitness;
                this.refs.communication.value = myCursor.skills.communication;
                this.refs.problemSolving.value = myCursor.skills.problemSolving;
                this.refs.selfControl.value = myCursor.skills.selfControl;
                this.refs.selfDiscipline.value = myCursor.skills.selfDiscipline;
                this.refs.selfEducation.value = myCursor.skills.selfEducation;
                this.refs.leadership.value = myCursor.skills.leadership;
                this.refs.research.value = myCursor.skills.research;
                this.refs.teamwork.value = myCursor.skills.teamwork;
                this.refs.dopamineRush.value = myCursor.healthIndicators.dopamineRush;
                this.refs.willpower.value = myCursor.healthIndicators.willpower;
                this.refs.comfortZone.value = myCursor.healthIndicators.comfortZone;
            } else {
                // if no records then all the fields are set to 0
                console.log("No records in the stats db");
                this.refs.creativity.value = "0";
                this.refs.communication.value = "0";
                this.refs.fitness.value = "0";
                this.refs.problemSolving.value = "0";
                this.refs.selfControl.value = "0";
                this.refs.selfDiscipline.value = "0";
                this.refs.selfEducation.value = "0";
                this.refs.leadership.value = "0";
                this.refs.research.value = "0";
                this.refs.teamwork.value = "0";
                this.refs.dopamineRush.value = "0";
                this.refs.willpower.value = "0";
                this.refs.comfortZone.value = "0";
            }
        });


    }

    render() {
        return (
            <div>
                <NavBar/>
                <p>This is the Stats component.</p>
                <form>
                    <input type={"text"} ref={"creativity"} placeholder={""}/>
                    <input type={"text"} ref={"fitness"} placeholder={""}/>
                    <input type={"text"} ref={"communication"} placeholder={""}/>
                    <input type={"text"} ref={"problemSolving"} placeholder={""}/>
                    <input type={"text"} ref={"selfDiscipline"} placeholder={""}/>
                    <input type={"text"} ref={"selfControl"} placeholder={""}/>
                    <input type={"text"} ref={"selfEducation"} placeholder={""}/>
                    <input type={"text"} ref={"teamwork"} placeholder={""}/>
                    <input type={"text"} ref={"leadership"} placeholder={""}/>
                    <input type={"text"} ref={"research"} placeholder={""}/>
                    <input type={"text"} ref={"dopamineRush"} placeholder={""}/>
                    <input type={"text"} ref={"willpower"} placeholder={""}/>
                    <input type={"text"} ref={"comfortZone"} placeholder={""}/>
                </form>
            </div>
        );
    }
}