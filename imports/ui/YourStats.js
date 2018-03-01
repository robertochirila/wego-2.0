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
                console.log(myCursor);
                this.refs.creativityBar.value = myCursor.creativity;
                this.refs.fitnessBar.value = myCursor.fitness;
                this.refs.leadershipBar.value = myCursor.leadership;
                this.refs.researchBar.value = myCursor.research;
                this.refs.teamworkBar.value = myCursor.teamwork;
                this.refs.disciplineBar.value = myCursor.discipline;
                this.refs.logicBar.value = myCursor.logic;
                this.refs.workEthicBar.value = myCursor.workEthic;
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
                <div className="skills--page">
                    <div className="row">
                        <div className="box">
                            <h1 className={'myH1'}>Skills</h1>
                        </div>
                    </div>
                    <div className="skills-header">
                        <div className={'row'}>
                            <div className={'col span-1-of-2'}>
                                <p>Please see bellow the levels of each skill that you posses.</p>
                                <p>Each skill gets improved after you finish a particular task.</p>
                            </div>
                            <div className={'col span-1-of-2'}>
                                <p>Next time when
                                    you
                                    create a
                                    task click the 'View Details' button.</p> <p>You will be able to see the skills
                                which
                                your
                                task will improve.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col span-3-of-3">
                                <div className="col span-1-of-8">
                                    <div className="box">
                                        <h2 className="myH2">Creativity</h2>
                                        <progress ref="creativityBar" className="progress" value="15" max="100">30%
                                        </progress>
                                    </div>

                                </div>
                                <div className="col span-1-of-8">
                                    <div className="box">
                                        <h2 className="myH2">Teamwork</h2>
                                        <progress ref="teamworkBar" className="progress" value="30" max="100">30%
                                        </progress>

                                    </div>
                                </div>
                                <div className="col span-1-of-8">
                                    <div className="box">
                                        <h2 className="myH2">Fitness</h2>
                                        <progress ref="fitnessBar" className="progress" value="45" max="100">45%
                                        </progress>

                                    </div>
                                </div>
                                <div className="col span-1-of-8">
                                    <div className="box">
                                        <h2 className="myH2">Discipline</h2>
                                        <progress ref="disciplineBar" className="progress" value="60" max="100">60%
                                        </progress>
                                    </div>

                                </div>
                                <div className="col span-1-of-8">
                                    <div className="box">
                                        <h2 className="myH2">Research</h2>
                                        <progress ref="researchBar" className="progress" value="75" max="100">75%
                                        </progress>

                                    </div>
                                </div>
                                <div className="col span-1-of-8">
                                    <div className="box">
                                        <h2 className="myH2">Logic</h2>
                                        <progress ref="logicBar" className="progress" value="90" max="100">90%
                                        </progress>

                                    </div>
                                </div>
                                <div className="col span-1-of-8">
                                    <div className="box">
                                        <h2 className="myH2">Leadership</h2>
                                        <progress ref="leadershipBar" className="progress" value="67" max="100">90%
                                        </progress>
                                    </div>

                                </div>
                                <div className="col span-1-of-8">
                                    <div className="box">
                                        <h2 className="myH2">Work Ethic</h2>
                                        <progress ref="workEthicBar" className="progress" value="67" max="100">90%
                                        </progress>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="box">
                            <h1 className={'myH1'}>Health Indicators</h1>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className={'col span-1-of-3'}>
                            <p>The purpose of the health indicators is to give you a feedback of your current
                                status.</p>
                            <p>Dopamine is a neurotransmitter that is connected to your brain's reward system. </p>
                            <p>Your brain uses is to motivate you to do certain behaviours.</p>
                            <p>Each time you complete a task, the dopamine level will rise.</p>
                            <p>The dopamine levels are very volatile, the idea is to complete as many tasks as possible
                                as quick as possible.</p>

                        </div>
                        <div className={'col span-1-of-3'}>
                            <p>You should aim that your comfort zone levels to be as low as possible.</p>
                            <p>The purpose of this app is to make you step out of your comfort zone as frequently as
                                possible.</p>
                            <p>Remember that everything if beautiful in the comfort zone, but nothing grows there.</p>
                        </div>
                        <div className={'col span-1-of-3'}>
                            <p>The willpower bar shows pretty straightforward the level of your willpower.</p>
                            <p>Following research, willpower can be trained and it is not an ability but more like a
                                muscle, the more you train it the better it will get.</p>
                            <p>However the amount of willpower which you can use is finite, this is why you are required
                                from time to time to rest so that your levels will increase. In this way you aquire
                                momentum.</p>
                        </div>

                    </div>
                    <div className="health-indicators-header">
                        <div className="row">
                            <div className="col span-1-of-3">
                                <div className="box">
                                    <h2 className="myH2">Dopamine Rush</h2>
                                    <progress ref="dopamineBar" className="progress" value="55" max="100">90%</progress>

                                </div>
                            </div>
                            <div className="col span-1-of-3">
                                <div className="box">
                                    <h2 className="myH2">Comfort Zone</h2>
                                    <progress ref="comfortBar" className="progress" value="67" max="100">90%</progress>

                                </div>
                            </div>
                            <div className="col span-1-of-3">
                                <div className="box">
                                    <h2 className="myH2">Willpower</h2>
                                    <progress ref="willpowerBar" className="progress" value="75" max="100">90%
                                    </progress>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
            ;
    }
}