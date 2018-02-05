import React from 'react'
import {Meteor} from 'meteor/meteor';
import Navbar from "./NavBar.js";
import moment from 'moment';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import UserProfile from "./UserProfile";


export default class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            peopleArray: []
        }
    }

    componentDidMount() {
        Meteor.subscribe('projects');
        Meteor.subscribe('profiles');
        Meteor.subscribe('following');
        Tracker.autorun(() => {
            let myCursor = projects.findOne({_id: this.props.projects._id});
            console.log(myCursor.projectDuration);
            let startTime = myCursor.startedAt;
            let durationInMinutes = myCursor.projectDuration * 24 * 60;
            let endTime = moment(startTime, 'MMM Do YY').add(durationInMinutes, 'minutes').format("MMM Do YY");
            let eventDay = this.refs.event;
            eventDay.innerHTML = endTime;
            let finishTime = myCursor.expiresIn;
            let hoursSpan = this.refs.hours;
            let minutesSpan = this.refs.minutes;
            let secondsSpan = this.refs.seconds;
            let myVar = setInterval(myCountdown, 1000);

            function myCountdown() {
                let now = moment().format('HH:mm:ss');
                let start = moment.utc(now, "HH:mm:ss");
                let end = moment.utc(finishTime, "HH:mm:ss");
                let duration = moment.duration(end.diff(start));
                hoursSpan.innerHTML = (duration.hours());
                minutesSpan.innerHTML = (duration.minutes());
                secondsSpan.innerHTML = (duration.seconds());
            }

        });
    };

    onSubmit(e) {
        e.preventDefault();
        let userEmail = this.refs.emailRef.value;
        //console.log(userEmail);
        let myCursor = profiles.find({email: userEmail}).fetch();
        //console.log(myCursor);
        this.setState({
            peopleArray: myCursor
        });
    }

    onEnrol(e) {
        e.preventDefault();
        Meteor.call('projects.update', this.props.projects._id, Meteor.userId());
    }

    render() {
        return (
            <div key={this.props.projects._id}>
                <Navbar/>
                <div className="row">
                    <h1>Discover People</h1>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div className="row">
                            <input type='text' ref='emailRef' placeholder='Search...'/>
                        </div>
                        <div className='row'>
                            <button className='btn edit'>Discover</button>
                        </div>
                    </form>
                </div>
                <div className="row">
                    <UserProfile user={this.state.peopleArray}/>
                </div>
                <div className="row">
                    <h1>Discover Events</h1>
                    <div className="col span-1-of-4">
                        <ReactCSSTransitionGroup transitionName="projectAnimation" transitionAppear={true}
                                                 transitionAppearTimeout={1500} transitionEnter={false}
                                                 transitionLeave={false}>
                            <div className="box">
                                <h1 className="projectName">{this.props.projects.projectName}</h1>
                                <div className="project-card">
                                    <div className="project-photo">
                                        <figure className="project-photo-figure">
                                            <img src="../../img/icon.png" className="round-photo"/>
                                        </figure>
                                    </div>
                                    <div className="project-description">
                                        <h3>{this.props.projects.projectDuration} days of training</h3>
                                        <h3>{this.props.projects.people} people enroled</h3>
                                    </div>
                                    <div className="task-countdown">
                                        <div className="row">
                                            <div className="col-12 eventDay">
                                                <h5>Event day</h5>
                                                <span className="event" ref={"event"}>0</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box">
                                        <h4>Enrol expires in: </h4>
                                    </div>
                                    <div className="task-countdown">
                                        <div className="row">
                                            <div className="col span-1-of-3">
                                                <h5>Hours</h5>
                                                <span className="hours" ref={"hours"}>0</span>
                                            </div>
                                            <div className="col span-1-of-3">
                                                <h5>Minutes</h5>
                                                <span className="minutes" ref={"minutes"}>0</span>
                                            </div>
                                            <div className="col span-1-of-3">
                                                <h5>Seconds</h5>
                                                <span className="seconds" ref={"seconds"}>0</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="project-button">
                                        <button className="btn enrol" onClick={this.onEnrol.bind(this)}>Enrol</button>
                                    </div>
                                </div>
                            </div>
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
            </div>
        );
    }
}