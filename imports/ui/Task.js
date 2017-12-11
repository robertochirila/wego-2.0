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
            let myCursor = tasks.findOne({_id: this.props.task._id});
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
        Meteor.call('tasks.remove', taskId);
    }

    startTask(e) {
        // first it updates the started field in the db
        // then it should make a call to a meteor function
        // passes the id of the task as argument
        // converts the duration to hours
        // and starts the countdown which will be provided
        // as an external file
        let myCursor = tasks.findOne({_id: this.props.task._id});
        let duration = myCursor.duration;
        console.log('Now the task should start');
        Meteor.call('tasks.started', this.props.task._id, duration);
        this.setState({
            startMessage: " Keep yourself productive. Don't forget, we are what we repeat ! "
        });
    }

    finishTask() {
        Meteor.subscribe('stats');
        console.log('Here you will finish the task manually');
        Meteor.call('tasks.finished', this.props.task._id);
        this.setState({
            finishMessage: " Nailed it ! "
        });
        if (stats.find().count() === 0) {
            Meteor.call('stats.insert', Meteor.userId(), this.props.task._id);
        } else {
            console.log('Stats update here!');
            Meteor.call('stats.update', Meteor.userId(), this.props.task._id);
        }
        // first it should update the finished field in the db
    }

    render() {
        return (
            <div key={this.props.task._id} className="card">
                <div className="photo">
                    <p>Here the photo of the task will be.</p>
                </div>
                <h3>Task Name: {this.props.task.taskName}</h3>
                <h3>Duration: {this.props.task.duration}</h3>
                <button onClick={this.detailTask.bind(this)} className="button button--detail">View Details</button>
                <button onClick={this.startTask.bind(this)} className="button button--start">Start Task</button>
                <button onClick={this.removeTask.bind(this)} className="button button--remove">Remove Task</button>
                <button onClick={this.finishTask.bind(this)} className="button button--finish">Finish Task</button>
                <p>Here the countdown will be displayed.</p>
                <div className="countdown">
                    <div>
                        <h5>Hours</h5>
                        <span className="hours" ref={"hours"}>0</span>
                    </div>
                    <div>
                        <h5>Minutes</h5>
                        <span className="minutes" ref={"minutes"}>0</span>
                    </div>
                    <div>
                        <h5>Seconds</h5>
                        <span className="seconds" ref={"seconds"}>0</span>
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
        );
    }
}