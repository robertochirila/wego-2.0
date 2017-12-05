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
                myCursor = stats.findOne({userId: Meteor.userId()});
                this.refs.creativity.value = myCursor.creativity;
                this.refs.analytics.value = myCursor.analytics;
                this.refs.fitness.value = myCursor.fitness;
                this.refs.research.value = myCursor.research;
                this.refs.communication.value = myCursor.communication;
                this.refs.problemsolving.value = myCursor.selfmotivation;
                this.refs.timemanagement.value = myCursor.teamwork;
                this.refs.leadership.value = myCursor.leadership;
                this.refs.selfmotivation.value = myCursor.timemanagement;
                this.refs.teamwork.value = myCursor.problemsolving;
            } else {
                // if no records then all the fields are set to 0
                console.log("No records in the stats db");
                this.refs.creativity.value = "0";
                this.refs.analytics.value = "0";
                this.refs.fitness.value = "0";
                this.refs.research.value = "0";
                this.refs.communication.value = "0";
                this.refs.problemsolving.value = "0";
                this.refs.timemanagement.value = "0";
                this.refs.leadership.value = "0";
                this.refs.selfmotivation.value = "0";
                this.refs.teamwork.value = "0";
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
                    <input type={"text"} ref={"analytics"} placeholder={""}/>
                    <input type={"text"} ref={"fitness"} placeholder={""}/>
                    <input type={"text"} ref={"research"} placeholder={""}/>
                    <input type={"text"} ref={"communication"} placeholder={""}/>
                    <input type={"text"} ref={"problemsolving"} placeholder={""}/>
                    <input type={"text"} ref={"timemanagement"} placeholder={""}/>
                    <input type={"text"} ref={"leadership"} placeholder={""}/>
                    <input type={"text"} ref={"selfmotivation"} placeholder={""}/>
                    <input type={"text"} ref={"teamwork"} placeholder={""}/>
                </form>
            </div>
        );
    }
}