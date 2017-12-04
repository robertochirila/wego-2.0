import React from 'react';

export default class Task extends React.Component {
    render() {
        return (
            <div key={this.props.task._id}>
                <p>This is the first task: {this.props.task.taskName}</p>
                <p>This task has duration: {this.props.task.duration}</p>
            </div>
        );
    }
}