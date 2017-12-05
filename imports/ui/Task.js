import React from 'react';
import DetailTask from './DetailTask';
import {Meteor} from "meteor/meteor";


export default class Task extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
            startMessage: "",
            finishMessage: ""
        }
    }

    detailTask() {
        console.log('Now the detailed component will be displayed ');
        this.setState({
            showComponent: true,
        });
    }

    removeTask() {
        const taskId = this.props.task._id;
        console.log(taskId);
        Meteor.call('tasks.remove', taskId);
    }

    startTask() {
        // first it updates the started field in the db
        // then it should make a call to a meteor function
        // passes the id of the task as argument
        // converts the duration to hours
        // and starts the countdown which will be provided
        // as an external file
        console.log('Now the task should start');
        Meteor.call('tasks.started', this.props.task._id);
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
        Meteor.call('stats.insert', Meteor.userId(),this.props.task._id);
        // first it should update the finished field in the db
    }

    render() {
        return (
            <div key={this.props.task._id}>
                <p>Here the photo of the task will be.</p>
                <p>This is the task name: {this.props.task.taskName}</p>
                <p>This task has duration: {this.props.task.duration}</p>
                <button onClick={this.detailTask.bind(this)}>View Details</button>
                <button onClick={this.startTask.bind(this)}>Start Task</button>
                <button onClick={this.removeTask.bind(this)}>Remove Task</button>
                <button onClick={this.finishTask.bind(this)}>Finish Task</button>
                <p>Here the countdown will be displayed.</p>
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