import React from 'react';
import TasksList from './TasksList';
import {Meteor} from 'meteor/meteor';
import NavBar from './NavBar';
import RenderTasks from './RenderTasks';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// AddTasks component

// This component is responsible for adding a new task to the task collection

export default class AddTasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            tasksArray: [],
            allTasks: []
            // tasksArray is used for retrieving all the tasks in the db
        }
    }

    componentDidMount() {
        Tracker.autorun(() => {
            Meteor.subscribe('mytasks');
            Meteor.subscribe('tasks');
            // when the component is mounted I retrieve all the tasks from the database and update the state of tasksArray
            console.log("Component is mounted !");
            const allTasks = tasks.find().fetch();
            const myTasks = mytasks.find().fetch();
            this.setState({
                tasksArray: myTasks,
                allTasks: allTasks
            });
        });
        console.log(this.state.tasksArray);
        console.log(this.state.allTasks);
    }

    submitTask(e) {
        e.preventDefault();
        let i = 0;
        let taskName = this.refs.taskName.value.trim();
        if (taskName !== '') {
            i++;
        }
        let creativityValue = this.refs.creativityInput.value.trim();
        if (Number(creativityValue) <= 1 && Number(creativityValue) > 0) {
            i++;
            $('#creativityInput').css('display', 'none');
            $('#teamworkInput').css('display', 'inline')
        }
        let teamworkValue = this.refs.teamworkInput.value.trim();
        if (Number(teamworkValue) <= 1 && Number(teamworkValue) > 0) {
            i++;
            $('#teamworkInput').css('display', 'none');
            $('#fitnessInput').css('display', 'inline');
        }
        let fitnessValue = this.refs.fitnessInput.value.trim();
        if (Number(fitnessValue) <= 1 && Number(fitnessValue) > 0) {
            i++;
            $('#fitnessInput').css('display', 'none');
            $('#disciplineInput').css('display', 'inline');
        }
        let disciplineValue = this.refs.disciplineInput.value.trim();
        if (Number(disciplineValue) <= 1 && Number(disciplineValue) > 0) {
            i++;
            $('#disciplineInput').css('display', 'none');
            $('#researchInput').css('display', 'inline');
        }
        let researchValue = this.refs.researchInput.value.trim();
        if (Number(researchValue) <= 1 && Number(researchValue) > 0) {
            i++;
            $('#researchInput').css('display', 'none');
            $('#logicInput').css('display', 'inline');
        }
        let logicValue = this.refs.logicInput.value.trim();
        if (Number(logicValue) <= 1 && Number(logicValue) > 0) {
            i++;
            $('#logicInput').css('display', 'none');
            $('#leadershipInput').css('display', 'inline');
        }
        let leadershipValue = this.refs.leadershipInput.value.trim();
        if (Number(leadershipValue) <= 1 && Number(leadershipValue) > 0) {
            i++;
            $('#leadershipInput').css('display', 'none');
            $('#workEthicInput').css('display', 'inline');
        }
        let workEthicValue = this.refs.workEthicInput.value.trim();
        if (Number(workEthicValue) <= 1 && Number(workEthicValue) > 0) {
            i++;
            $('#workEthicInput').css('display', 'none');
            $('#fitnessInput').css('display', 'inline');
        }
        if (i === 9) {
            // Call method that asks the admin to validate the task
            $('#fitnessInput').css('display', 'none');
            console.log('Propose task complete !');
            console.log(i);
        }
    }

    render() {
        // rendering the component, calling TasksList and passing the tasksArray state object as a prop
        return (
            <div className="header-task">
                <NavBar/>
                <div className="row">
                    <div className={'col span-1-of-2'} id={'t1'}>
                        <div className={'box'}>
                            <ReactCSSTransitionGroup transitionName="opacityAnimation" transitionAppear={true}
                                                     transitionAppearTimeout={2000} transitionLeave={false}>
                                <h1 className={'myH1--tasks'}>Propose a Task</h1>
                            </ReactCSSTransitionGroup>
                        </div>
                        <ReactCSSTransitionGroup transitionName="moveRightAnimation" transitionAppear={true}
                                                 transitionAppearTimeout={2000} transitionLeave={false}>
                            <form onSubmit={this.submitTask.bind(this)} className={'submit-task__form'}>
                                <div className={'row'}>
                                    <input type={'text'} ref={'taskName'} placeholder={'Task Name'}
                                           className={'submit-task__input'}/>
                                </div>
                                <div className={'row'}>
                                    <input type={'text'} ref={'creativityInput'} placeholder={'Creativity value 0-1'}
                                           className={'submit-task__input'} id={'creativityInput'}
                                           name={'creativityInput'}/>
                                </div>
                                <div className={'row'}>
                                    <input type={'text'} ref={'teamworkInput'} placeholder={'Teamwork value 0-1'}
                                           className={'submit-task__input'} id={'teamworkInput'}/>
                                </div>
                                <div className={'row'}>
                                    <input type={'text'} ref={'fitnessInput'} placeholder={'Fitness value 0-1'}
                                           className={'submit-task__input'} id={'fitnessInput'}/>
                                </div>
                                <div className={'row'}>
                                    <input type={'text'} ref={'disciplineInput'} placeholder={'Discipline value 0-1'}
                                           className={'submit-task__input'} id={'disciplineInput'}/>
                                </div>
                                <div className={'row'}>
                                    <input type={'text'} ref={'researchInput'} placeholder={'Research value 0-1'}
                                           className={'submit-task__input'} id={'researchInput'}/>
                                </div>
                                <div className={'row'}>
                                    <input type={'text'} ref={'logicInput'} placeholder={'Logic value 0-1'}
                                           className={'submit-task__input'}
                                           id={'logicInput'}/>
                                </div>
                                <div className={'row'}>
                                    <input type={'text'} ref={'leadershipInput'} placeholder={'Leadership value 0-1'}
                                           className={'submit-task__input'} id={'leadershipInput'}/>
                                </div>
                                <div className={'row'}>
                                    <input type={'text'} ref={'workEthicInput'} placeholder={'Work Ethic value 0-1'}
                                           className={'submit-task__input'} id={'workEthicInput'}/>
                                </div>
                                <div className={'row'}>
                                    <button type={'submit'} className={'btn btn__submit'}>Submit</button>
                                </div>
                            </form>
                        </ReactCSSTransitionGroup>
                    </div>
                    <div className="col span-1-of-2"id={'t2'}>
                        <div className={'box'}>
                            <ReactCSSTransitionGroup transitionName="opacityAnimation" transitionAppear={true}
                                                     transitionAppearTimeout={2000} transitionLeave={false}>
                                <h1 className={'myH1--tasks'}>Select a Task</h1>
                            </ReactCSSTransitionGroup>
                        </div>
                        <ReactCSSTransitionGroup transitionName="moveLeftAnimation" transitionAppear={true}
                                                 transitionAppearTimeout={2000} transitionEnter={false}
                                                 transitionLeave={false}>
                            {this.state.error ? <p>{this.state.error}</p> : undefined}
                            <RenderTasks myTasks={this.state.allTasks}/>
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
                <div className="row">
                    <TasksList tasks={this.state.tasksArray}/>
                </div>
            </div>
        );
    }
}