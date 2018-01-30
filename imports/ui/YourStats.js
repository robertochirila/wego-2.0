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
                this.refs.creativityBar.value = myCursor.creativity;
                this.refs.fitnessBar.value = myCursor.fitness;
                this.refs.leadershipBar.value = myCursor.leadership;
                this.refs.researchBar.value = myCursor.research;
                this.refs.teamworkBar.value = myCursor.teamwork;
                this.refs.disciplineBar.value = myCursor.selfDiscipline;
                this.refs.logicBar.value = myCursor.problemSolving;
                this.refs.dopamineBar.value = '30';
                this.refs.willpowerBar.value = '40';
                this.refs.comfortBar.value = '100';
            } else {
                // if no records then all the fields are set to 0
                console.log("No records in the stats db");

            }
        });


    }

    render() {
        return (
            <div>
                <NavBar/>
                <div className="skills-health-indicators-section">
                    <div className="row">
                        <div className="box">
                            <h1>Skills</h1>
                        </div>
                    </div>
                    <div className="skills-header">
                        <div className="row">
                            <div className="col span-3-of-3">
                                <div className="col span-1-of-7">
                                    <div className="box">
                                        <h2 className="header-skills creativity">Creativity</h2>
                                    </div>
                                    <progress ref="creativityBar" className="progress" value="15" max="100">30%
                                    </progress>
                                </div>
                                <div className="col span-1-of-7">
                                    <div className="box">
                                        <h2 className="header-skills teamwork">Teamwork</h2>
                                    </div>
                                    <progress ref="teamworkBar" className="progress" value="30" max="100">30%</progress>
                                </div>
                                <div className="col span-1-of-7">
                                    <div className="box">
                                        <h2 className="header-skills fitness">Fitness</h2>
                                    </div>
                                    <progress ref="fitnessBar" className="progress" value="45" max="100">45%</progress>
                                </div>
                                <div className="col span-1-of-7">
                                    <div className="box">
                                        <h2 className="header-skills discipline">Discipline</h2>
                                    </div>
                                    <progress ref="disciplineBar" className="progress" value="60" max="100">60%
                                    </progress>
                                </div>
                                <div className="col span-1-of-7">
                                    <div className="box">
                                        <h2 className="header-skills research">Research</h2>
                                    </div>
                                    <progress ref="researchBar" className="progress" value="75" max="100">75%</progress>
                                </div>
                                <div className="col span-1-of-7">
                                    <div className="box">
                                        <h2 className="header-skills logic">Logic</h2>
                                    </div>
                                    <progress ref="logicBar" className="progress" value="90" max="100">90%</progress>
                                </div>
                                <div className="col span-1-of-7">
                                    <div className="box">
                                        <h2 className="header-skills leadership">Leadership</h2>
                                    </div>
                                    <progress ref="leadershipBar" className="progress" value="67" max="100">90%
                                    </progress>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="box">
                            <h1>Health Indicators</h1>
                        </div>
                    </div>
                    <div className="health-indicators-header">
                        <div className="row">
                            <div className="col span-1-of-3">
                                <div className="box">
                                    <h2 className="header-skills dopamine">Dopamine Rush</h2>
                                </div>
                                <progress ref="dopamineBar" className="progress" value="55" max="100">90%</progress>
                            </div>
                            <div className="col span-1-of-3">
                                <div className="box">
                                    <h2 className="header-skills comfort">Comfort Zone</h2>
                                </div>
                                <progress ref="comfortBar" className="progress" value="67" max="100">90%</progress>
                            </div>
                            <div className="col span-1-of-3">
                                <div className="box">
                                    <h2 className="header-skills willpower">Willpower</h2>
                                </div>
                                <progress ref="willpowerBar" className="progress" value="75" max="100">90%</progress>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}