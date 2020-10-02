import React from 'react';
import Task from './Task';


export default class TasksList extends React.Component {

    renderTasks() {
        // this method first checks if there are any tasks in the database
        // if not then it prints a message
        if (this.props.tasks.length === 0) {
            return (
                <div>
                    <p>You have no tasks in the database !</p>
                </div>
            )
        } else {
            // otherwise it accesses the props and maps all its content
            // then it returns for each task object a Task component
            console.log(this.props.tasks);
            return this.props.tasks.map(function (task) {
                return <Task key={task._id} task={task}/>
            });
        }
    }

    render() {
        return (
            <div>
                {this.renderTasks()}
            </div>
        );
    }
}