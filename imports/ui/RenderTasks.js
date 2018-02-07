import React from 'react';
import AllTasks from './AllTasks';
import {Meteor} from "meteor/meteor";


export default class RenderTasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentState: '',
            error: ''
        }
    }

    fetchTasks() {
        Meteor.subscribe('tasks');
        return this.props.myTasks.map(function (tasks) {
            return <AllTasks key={tasks._id} task={tasks}/>
        });
    }

    handleChange(event) {
        this.setState({
            currentState: event.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        let taskName = this.state.currentState;
        let taskDuration = (parseInt(this.refs.duration.value));
        if ((taskName && taskDuration) !== "") {
            Meteor.call('mytasks.insert', taskName, taskDuration)
        } else {
            this.setState({
                error: "Values shouldn't be null !"
            })
        }
    }


    render() {
        return (
            <div className='row'>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className='row'>
                        <select onChange={this.handleChange.bind(this)}>
                            {this.fetchTasks()}
                        </select>
                    </div>
                    <div className='row'>
                        <input type='text' ref='duration' placeholder='duration'/>
                    </div>
                    <div className='row'>
                        <button>Submit Task</button>
                    </div>
                </form>
                {this.state.currentState}
            </div>
        );
    }
}