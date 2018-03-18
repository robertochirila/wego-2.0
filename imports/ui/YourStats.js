import React from 'react';
import NavBar from './NavBar';
import {Meteor} from 'meteor/meteor';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


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
                let f2 = setInterval(myFunc, 50);
                let that = this;
                this.refs.creativityBar.value = '0';
                this.refs.fitnessBar.value = '0';
                this.refs.leadershipBar.value = '0';
                this.refs.researchBar.value = '0';
                this.refs.teamworkBar.value = '0';
                this.refs.disciplineBar.value = '0';
                this.refs.logicBar.value = '0';
                this.refs.workEthicBar.value = '0';
                this.refs.dopamineBar.value = '30';
                this.refs.willpowerBar.value = '40';
                this.refs.comfortBar.value = '100';

                function myFunc() {
                    if (that.refs.creativityBar.value <= myCursor.creativity) {
                        that.refs.creativityBar.value = that.refs.creativityBar.value + 1;
                    }
                    if (that.refs.fitnessBar.value <= myCursor.fitness) {
                        that.refs.fitnessBar.value = that.refs.fitnessBar.value + 1;
                    }
                    if (that.refs.leadershipBar.value <= myCursor.leadership) {
                        that.refs.leadershipBar.value = that.refs.leadershipBar.value + 1;
                    }
                    if (that.refs.researchBar.value <= myCursor.research) {
                        that.refs.researchBar.value = that.refs.researchBar.value + 1;
                    }
                    if (that.refs.teamworkBar.value <= myCursor.teamwork) {
                        that.refs.teamworkBar.value = that.refs.teamworkBar.value + 1;
                    }
                    if (that.refs.disciplineBar.value <= myCursor.discipline) {
                        that.refs.disciplineBar.value = that.refs.disciplineBar.value + 1;
                    }
                    if (that.refs.logicBar.value <= myCursor.logic) {
                        that.refs.logicBar.value = that.refs.logicBar.value + 1;
                    }
                    if (that.refs.workEthicBar.value <= myCursor.workEthic) {
                        that.refs.workEthicBar.value = that.refs.workEthicBar.value + 1;
                    }
                }

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
                            <ReactCSSTransitionGroup transitionName="opacityAnimation" transitionAppear={true}
                                                     transitionAppearTimeout={2000} transitionEnter={false}
                                                     transitionLeave={false}>
                                <h1 className={'myH1'}>Skills</h1>
                            </ReactCSSTransitionGroup>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className={'box'}>
                            <div className={'col span-1-of-2'}>
                                <figure>
                                    <ReactCSSTransitionGroup transitionName="rotateAnimation" transitionAppear={true}
                                                             transitionAppearTimeout={2000} transitionEnter={false}
                                                             transitionLeave={false}>
                                        <img src={'img/icon1.png'} className={'logoStats'}/>
                                    </ReactCSSTransitionGroup>
                                </figure>
                            </div>
                        </div>
                        <div className={'box'}>
                            <div className={'col span-1-of-2'}>
                                <figure>
                                    <ReactCSSTransitionGroup transitionName="rotateAnimation" transitionAppear={true}
                                                             transitionAppearTimeout={2000} transitionEnter={false}
                                                             transitionLeave={false}>
                                        <img src={'img/icon2.png'} className={'logoStats'}/>
                                    </ReactCSSTransitionGroup>
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div className="skills-header">
                        <div className={'row'}>
                            <div className={'col span-1-of-2'}>
                                <ReactCSSTransitionGroup transitionName="moveRightAnimation" transitionAppear={true}
                                                         transitionAppearTimeout={2000} transitionEnter={false}
                                                         transitionLeave={false}>
                                    <p>Please see bellow the levels of each skill that you posses.
                                        Each skill gets
                                        improved after you finish a particular task.</p>
                                </ReactCSSTransitionGroup>
                            </div>
                            <div className={'col span-1-of-2'}>
                                <ReactCSSTransitionGroup transitionName="moveLeftAnimation" transitionAppear={true}
                                                         transitionAppearTimeout={2000} transitionEnter={false}
                                                         transitionLeave={false}>
                                    <p>Next time when
                                        you
                                        create a
                                        task click the 'View Details' button.You will be able to see the skills
                                        which
                                        your
                                        task will improve.</p>
                                </ReactCSSTransitionGroup>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col span-3-of-3">
                                <div className="col span-1-of-8 skillsColumn">
                                    <div className="box">
                                        <h2 className="myH2">Creativity</h2>
                                        <progress ref="creativityBar" className="progress" value="15" max="100">30%
                                        </progress>
                                    </div>
                                </div>
                                <div className="col span-1-of-8 skillsColumn">
                                    <div className="box">
                                        <h2 className="myH2">Teamwork</h2>
                                        <progress ref="teamworkBar" className="progress" value="30" max="100">30%
                                        </progress>
                                    </div>
                                </div>
                                <div className="col span-1-of-8 skillsColumn">
                                    <div className="box">
                                        <h2 className="myH2">Fitness</h2>
                                        <progress ref="fitnessBar" className="progress" value="45" max="100">45%
                                        </progress>
                                    </div>
                                </div>
                                <div className="col span-1-of-8 skillsColumn">
                                    <div className="box">
                                        <h2 className="myH2">Discipline</h2>
                                        <progress ref="disciplineBar" className="progress" value="60" max="100">60%
                                        </progress>
                                    </div>
                                </div>
                                <div className="col span-1-of-8 skillsColumn">
                                    <div className="box">
                                        <h2 className="myH2">Research</h2>
                                        <progress ref="researchBar" className="progress" value="75" max="100">75%
                                        </progress>
                                    </div>
                                </div>
                                <div className="col span-1-of-8 skillsColumn">
                                    <div className="box">
                                        <h2 className="myH2">Logic</h2>
                                        <progress ref="logicBar" className="progress" value="90" max="100">90%
                                        </progress>
                                    </div>
                                </div>
                                <div className="col span-1-of-8 skillsColumn">
                                    <div className="box">
                                        <h2 className="myH2">Leadership</h2>
                                        <progress ref="leadershipBar" className="progress" value="67" max="100">90%
                                        </progress>
                                    </div>
                                </div>
                                <div className="col span-1-of-8 skillsColumn">
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
                            <ReactCSSTransitionGroup transitionName="opacityAnimation" transitionAppear={true}
                                                     transitionAppearTimeout={2000} transitionEnter={false}
                                                     transitionLeave={false}>
                                <h1 className={'myH1'}>Health Indicators</h1>
                            </ReactCSSTransitionGroup>
                            <figure>
                                <ReactCSSTransitionGroup transitionName="rotateAnimation" transitionAppear={true}
                                                         transitionAppearTimeout={2000} transitionEnter={false}
                                                         transitionLeave={false}>
                                    <img src={'./img/icon3.png'} className={'logoStats'}/>
                                </ReactCSSTransitionGroup>
                            </figure>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className={'col span-1-of-3 healthColumn'}>
                            <ReactCSSTransitionGroup transitionName="opacityAnimation" transitionAppear={true}
                                                     transitionAppearTimeout={2000} transitionEnter={false}
                                                     transitionLeave={false}>
                                <p className={'what--paragraph'}>The purpose of the health indicators is to give you a feedback of your current
                                    status.
                                    Dopamine is a neurotransmitter that is connected to your brain's reward system.
                                    Your brain uses is to motivate you to do certain behaviours.
                                    Each time you complete a task, the dopamine level will rise.</p>
                            </ReactCSSTransitionGroup>
                        </div>
                        <div className={'col span-1-of-3 healthColumn'}>
                            <ReactCSSTransitionGroup transitionName="opacityAnimation" transitionAppear={true}
                                                     transitionAppearTimeout={2000} transitionEnter={false}
                                                     transitionLeave={false}>
                                <p className={'what--paragraph'}>You should aim that your comfort zone levels to be as low as possible.
                                    The purpose of this app is to make you step out of your comfort zone as frequently
                                    as
                                    possible.
                                    Remember that everything if beautiful in the comfort zone, but nothing grows
                                    there.</p>
                            </ReactCSSTransitionGroup>
                        </div>
                        <div className={'col span-1-of-3 healthColumn'}>
                            <ReactCSSTransitionGroup transitionName="opacityAnimation" transitionAppear={true}
                                                     transitionAppearTimeout={2000} transitionEnter={false}
                                                     transitionLeave={false}>
                                <p className={'what--paragraph'}>The willpower bar shows pretty straightforward the level of your willpower.
                                    Following research, willpower can be trained and it is not an ability but more like
                                    a
                                    muscle, the more you train it the better it will get.
                                    However the amount of willpower which you can use is finite, this is why you are
                                    required
                                    from time to time to rest so that your levels will increase. In this way you aquire
                                    momentum.
                                </p>
                            </ReactCSSTransitionGroup>
                        </div>
                    </div>
                    <div className="health-indicators-header">
                        <div className="row">
                            <div className="col span-1-of-3 healthIndicators">
                                <div className="box">
                                    <h2 className="myH2">Dopamine Rush</h2>
                                    <progress ref="dopamineBar" className="progress" value="55" max="100">90%</progress>
                                </div>
                            </div>
                            <div className="col span-1-of-3 healthIndicators">
                                <div className="box">
                                    <h2 className="myH2">Comfort Zone</h2>
                                    <progress ref="comfortBar" className="progress" value="67" max="100">90%</progress>
                                </div>
                            </div>
                            <div className="col span-1-of-3 healthIndicators">
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
        );
    }
}