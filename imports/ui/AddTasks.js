import React from 'react';
import TasksList from './TasksList';
import {Meteor} from 'meteor/meteor';
import NavBar from './NavBar';

// AddTasks component

// This component is responsible for adding a new task to the task collection

export default class AddTasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            tasksArray: []
            // tasksArray is used for retrieving all the tasks in the db
        }
    }

    componentDidMount() {
        Tracker.autorun(() => {
            Meteor.subscribe('mytasks');
            // when the component is mounted I retrieve all the tasks from the database and update the state of tasksArray
            console.log("Component is mounted !");
            const myTasks = mytasks.find().fetch();
            this.setState({
                tasksArray: myTasks
            });
        });
        console.log(this.state.tasksArray);
    }

    onSubmit(e) {
        // this function gets the values from the input field and makes the insertion
        // later I will create a Meteor method that calls tasks.insert etc and perform input validation
        e.preventDefault();
        const taskName = this.refs.taskName.value.trim();
        const duration = Number(this.refs.duration.value.trim());
        if ((taskName && duration) !== "") {
            Meteor.call('mytasks.insert', taskName, duration)
        } else {
            this.setState({
                error: "Values shouldn't be null !"
            })
        }
        this.refs.taskName.value = '';
        this.refs.duration.value = '';
    }

    render() {
        // rendering the component, calling TasksList and passing the tasksArray state object as a prop
        return (
            <div>
                <NavBar/>
                <p>This is the Tasks component.</p>
                {this.state.error ? <p>{this.state.error}</p> : undefined}
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type={"text"} ref={"taskName"} placeholder={"Task Name"}/>
                    <input type={"text"} ref={"duration"} placeholder={"Duration"}/>
                    <button>Submit Task</button>
                </form>
                <TasksList tasks={this.state.tasksArray}/>
            </div>
        );
    }
}