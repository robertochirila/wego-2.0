import React from 'react';
import DetailTask from './DetailTask';
import {Meteor} from "meteor/meteor";
import moment from 'moment';


export default class Task extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
            startMessage: "",
            finishMessage: ""
        }
    }

    componentDidMount() {
        Tracker.autorun(() => {
            let myCursor = mytasks.findOne({_id: this.props.task._id});
            let taskId = this.props.task._id;
            let started = myCursor.started;
            let hoursSpan = this.refs.hours;
            let minutesSpan = this.refs.minutes;
            let secondsSpan = this.refs.seconds;
            if (started === true) {
                let finishTime = myCursor.finishTime;
                let myVar = setInterval(myCountdown, 1000);

                function myCountdown() {
                    let now = moment().format('LTS');
                    let start = moment.utc(now, "HH:mm:ss");
                    let end = moment.utc(finishTime, "HH:mm:ss");
                    let duration = moment.duration(end.diff(start));
                    console.log(end.diff(start));
                    hoursSpan.innerHTML = (duration.hours());
                    minutesSpan.innerHTML = (duration.minutes());
                    secondsSpan.innerHTML = (duration.seconds());
                    if (duration.hours() === 0 && duration.minutes() === 0 && duration.seconds() === 1) {
                        console.log("task has finished");
                        Meteor.call('tasks.finished', taskId);
                    }
                }
            } else {
                console.log("This task hasn't started");
            }
        });
    }

    detailTask(e) {
        console.log('Now the detailed component will be displayed ');
        this.setState({
            showComponent: true,
        });
    }

    removeTask(e) {
        const taskId = this.props.task._id;
        //console.log(taskId);
        Meteor.call('mytasks.remove', taskId);
    }

    startTask(e) {
        // first it updates the started field in the db
        // then it should make a call to a meteor function
        // passes the id of the task as argument
        // converts the duration to hours
        // and starts the countdown which will be provided
        // as an external file
        let myCursor = mytasks.findOne({_id: this.props.task._id});
        let duration = myCursor.duration;
        console.log('Now the task should start');
        Meteor.call('mytasks.started', this.props.task._id, duration);
        this.setState({
            startMessage: " Keep yourself productive. Don't forget, we are what we repeat ! "
        });
    }

    finishTask() {
        Meteor.subscribe('stats');
        console.log('Here you will finish the task manually');
        Meteor.call('mytasks.finished', this.props.task._id);
        this.setState({
            finishMessage: " Nailed it ! "
        });
        if (stats.find().count() > 0) {
            console.log('Stats update here!');
            Meteor.call('stats.update', Meteor.userId(), this.props.task._id);
        } else {
            Meteor.call('stats.insert', Meteor.userId(), this.props.task._id);
        }
        // first it should update the finished field in the db
    }

    render() {
        return (
            <div key={this.props.task._id}>
                <div className="col-4">
                    <div className="task-card">
                        <div className="box">
                            <div className="task-photo">
                                <figure className="task-photo-figure">
                                    <img src="../../img/icon.png" className="round-photo"/>
                                </figure>
                            </div>
                            <div className="task-description">
                                <h3>{this.props.task.taskName}</h3>
                                <h3>{this.props.task.duration}</h3>
                            </div>
                            <div className="task-buttons">
                                <ul className="task-buttons-list">
                                    <li>
                                        <button className="btn view" onClick={this.detailTask.bind(this)}>View Details
                                        </button>
                                    </li>
                                    <li>
                                        <button className="btn start" onClick={this.startTask.bind(this)}>Start Task
                                        </button>
                                    </li>
                                    <li>
                                        <button className="btn remove" onClick={this.removeTask.bind(this)}>Remove
                                            Task
                                        </button>
                                    </li>
                                    <li>
                                        <button className="btn finish" onClick={this.finishTask.bind(this)}>Finish
                                            Task
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div className="task-countdown">
                                <div className="row">
                                    <div className="col-4">
                                        <h5>Hours</h5>
                                        <span className="hours" ref={"hours"}>2</span>
                                    </div>
                                    <div className="col-4">
                                        <h5>Minutes</h5>
                                        <span className="minutes" ref={"minutes"}>27</span>
                                    </div>
                                    <div className="col-4">
                                        <h5>Seconds</h5>
                                        <span className="seconds" ref={"seconds"}>3</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.showComponent ?
                        <DetailTask id={this.props.task._id} taskName={this.props.task.taskName}/> :
                        null}
                    {this.state.startMessage ? <p>{this.state.startMessage}</p> :
                        null}
                    {this.state.finishMessage ? <p>{this.state.finishMessage}</p> :
                        null}
                </div>
            </div>
        );
    }
}