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
                <div className='col span-1-of-3'>
                </div>
                <div className='col span-1-of-3'>
                    <form onSubmit={this.onSubmit.bind(this)} className={'submit-task__form'}>
                        <div className='row'>
                            <select onChange={this.handleChange.bind(this)} className={'submit-task__select'}>
                                {this.fetchTasks()}
                            </select>
                        </div>
                        <div className='row'>
                            <input type='text' ref='duration' placeholder='duration' className={'submit-task__input'}/>
                        </div>
                        <div className='row'>
                            <button className={'btn btn__submit'}>Submit Task</button>
                        </div>
                    </form>
                </div>
                <div className='col span-1-of-3'>
                </div>
                {this.state.currentState}
            </div>
        );
    }
}