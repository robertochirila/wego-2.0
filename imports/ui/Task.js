import React from 'react';
import DetailTask from './DetailTask';
import {Meteor} from "meteor/meteor";
import moment from 'moment';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Modal from 'react-modal';
import FlipMove from 'react-flip-move';

export default class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
            startMessage: "",
            finishMessage: "",
            isOpen: false,
            divStyle: '',
            creativity: 0,
            teamwork: 0,
            fitness: 0,
            discipline: 0,
            research: 0,
            logic: 0,
            leadership: 0,
            workEthic: 0,
            projectMessage: ''
        }
    }

    componentDidMount() {
        Tracker.autorun(() => {
            Meteor.subscribe('myprofile');
            Meteor.subscribe('projects');
            let taskName = this.props.task.taskName;
            console.log(taskName);
            switch (taskName) {
                case 'PROGRAMMING':
                    console.log('changed image for programming');
                    this.setState({
                        url: './img/programming.png'
                    });
                    break;
                case 'READING':
                    console.log('changed image for reading');
                    this.setState({
                        url: './img/reading.png'
                    });
                    break;
                case 'RUNNING':
                    this.setState({
                        url: './img/running.png'
                    });
                    break;
                case 'PLAYING TENNIS':
                    this.setState({
                        url: './img/tennis.png'
                    });
                    break;

            }
            let f2 = setTimeout(myFunc, 500);
            let that = this;
            function myFunc() {
                let taskName = that.props.task.taskName;
                //console.log(taskName);
                let myCursor2 = myprofile.findOne({userId: Meteor.userId()});
                //let relevantTasks = myCursor2.relevantTasks;
                //console.log(myCursor2.projects);
                for (let i = 0; i < myCursor2.projects.length; i++) {
                    //console.log(projectId);
                    let projectId = myCursor2.projects[i];
                    if (projectId !== undefined) {
                        console.log(projectId);
                        let myCursor3 = projects.findOne({_id: projectId});
                        console.log(myCursor3);
                        let relevantTasks = myCursor3.relevantTasks;
                        let projectName = myCursor3.projectName;
                        console.log(relevantTasks);
                        console.log(taskName);
                        if (relevantTasks.includes(taskName)) {
                            console.log('Entered here!');
                            console.log(projectName);
                            that.setState({
                                projectMessage: projectName
                            })
                        }
                    }
                }

            }

            let myCursor = mytasks.findOne({_id: this.props.task._id});
            let taskId = this.props.task._id;
            let started = myCursor.started;
            let myTime = moment.utc(myCursor.startedAt, 'HH:mm:ss');
            let hour = myTime.hours();
            let min = myTime.minutes();
            let sec = myTime.seconds();
            let now = moment().format('HH:mm:ss');
            let checkTime = moment.utc(now, "HH:mm:ss");
            if (checkTime.hours() < hour) {
                Meteor.call('mytasks.remove', taskId);
            } else if (checkTime.hours() === hour && checkTime.minutes() < min) {
                Meteor.call('mytasks.remove', taskId);
            }
            console.log(hour, min, sec);
            let hoursSpan = this.refs.hours;
            let minutesSpan = this.refs.minutes;
            let secondsSpan = this.refs.seconds;
            if (started === true) {
                let finishTime = myCursor.finishTime;
                let myVar = setInterval(myCountdown, 1000);

                function myCountdown() {
                    let now = moment().format('HH:mm:ss');
                    let start = moment.utc(now, "HH:mm:ss");
                    let end = moment.utc(finishTime, "HH:mm:ss");
                    let duration = moment.duration(end.diff(start));
                    hoursSpan.innerHTML = (duration.hours());
                    minutesSpan.innerHTML = (duration.minutes());
                    secondsSpan.innerHTML = (duration.seconds());
                    if (duration.hours() === 0 && duration.minutes() === 0 && duration.seconds() === 1) {
                        //console.log("task has finished");
                        Meteor.call('tasks.finished', taskId);
                    }
                }
            } else {
                //console.log("This task hasn't started");
            }
        });
    }


    viewDetails(e) {
        this.setState({isOpen: true});
        let myCursor = mytasks.findOne({taskName: this.props.task.taskName});
        console.log(myCursor);
        console.log(this.props.task._id);
        console.log(this.props.task.taskName);
        let creativity = myCursor.skills.creativity;
        let teamwork = myCursor.skills.teamwork;
        let fitness = myCursor.skills.fitness;
        let discipline = myCursor.skills.discipline;
        let research = myCursor.skills.research;
        let logic = myCursor.skills.logic;
        let leadership = myCursor.skills.leadership;
        let workEthic = myCursor.skills.workEthic;
        console.log(creativity, teamwork, fitness, discipline, research, logic, leadership, workEthic);
        this.setState({
            creativity: creativity * 10,
            teamwork: teamwork * 10,
            fitness: fitness * 10,
            discipline: discipline * 10,
            research: research * 10,
            logic: logic * 10,
            leadership: leadership * 10,
            workEthic: workEthic * 10
        });
        /*$('#creativityBar').val(creativity);
        $('#fitnessBar').value = creativity;
        $('#leadershipBar').value = creativity;
        $('#researchBar').value = creativity;
        $('#teamworkBar').value = creativity;
        $('#disciplineBar').value = creativity;
        $('#logicBar').value = creativity;
        $('#workEthicBar').value = creativity;*/

        /*console.log(this.refs.creativityBar.value);
        this.refs.creativityBar.value = creativity;
        this.refs.fitnessBar.value = teamwork;
        this.refs.leadershipBar.value = fitness;
        this.refs.researchBar.value = discipline;
        this.refs.teamworkBar.value = research;
        this.refs.disciplineBar.value = logic;
        this.refs.logicBar.value = leadership;
        this.refs.workEthicBar.value = '40';*/


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
        Meteor.subscribe('tasks');
        let myCursor = mytasks.findOne({_id: this.props.task._id});
        let myCursor2 = tasks.findOne({name: this.props.task.taskName});
        console.log(myCursor2.name);
        let duration = myCursor.duration;
        Meteor.call('tasks.update', myCursor2.name, Meteor.userId());
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

    renderTask(e) {
        let imgUrl = this.state.url;
        let taskImage = {
            /*backgroundImage: 'url(' + imgUrl + ')',
            backgroundPosition:'center',
            backgroundSize:'cover',
            backgroundRepeat:'no-repeat',*/
            width: 280,
            height: 240

        };
        return (
            <ReactCSSTransitionGroup transitionName="opacityAnimation" transitionAppear={true}
                                     transitionAppearTimeout={2000} transitionLeave={false}>
                <div className="col span-1-of-3" id={'taskColumn'}>
                    <div className={'box'}>
                        <div className={'col span-1-of-2'}>
                            <div className={'row'}>
                                <div className="task--photo">
                                    <figure className="task--photo--figure">
                                        <ReactCSSTransitionGroup transitionName="rotateAnimation"
                                                                 transitionAppear={true}
                                                                 transitionAppearTimeout={2000}
                                                                 transitionLeave={false}>
                                            <img src={this.state.url} style={taskImage}/>
                                        </ReactCSSTransitionGroup>
                                    </figure>
                                </div>
                            </div>
                            <div className={'row'}>
                                <div className="task--countdown">
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
                            </div>
                        </div>
                        <div className={'col span-1-of-2'}>
                            <div className={'row'}>
                                <div className="task--description">
                                    <h4 className={'task--name--header'}>{this.props.task.taskName} for </h4>
                                    <h4 className={'task--name--header'}>{this.props.task.duration} hours</h4>
                                    {this.state.projectMessage ?
                                        <h4 className={'task--name--header'}>In
                                            the {this.state.projectMessage}</h4> :
                                        null}
                                </div>
                            </div>
                            <div className={'row'}>
                                <div className="task--buttons">
                                    <div className={'col span-1-of-2'}>
                                        <ul className="task--buttons--list">
                                            <FlipMove duration={750} easing="ease-out">
                                                <li>
                                                    <button className="btn btn__view-details"
                                                            id={'viewDetailsButton'}
                                                            onClick={this.viewDetails.bind(this)}>View
                                                        Details
                                                    </button>
                                                </li>
                                                <li>
                                                    <button className="btn btn__remove-task" id={'removeButton'}
                                                            onClick={this.removeTask.bind(this)}>Remove
                                                        Task
                                                    </button>
                                                </li>

                                            </FlipMove>
                                        </ul>
                                    </div>
                                </div>
                                <div className={'col span-1-of-2'}>
                                    <ul className={'task--buttons--list'}>
                                        <FlipMove duration={750} easing="ease-out">
                                            <li>
                                                <button className="btn btn__finish" id={'finishButton'}
                                                        onClick={this.finishTask.bind(this)}>Finish
                                                    Task
                                                </button>
                                            </li>
                                            <li>
                                                <button className="btn btn__start" id={'startButton'}
                                                        onClick={this.startTask.bind(this)}>Start
                                                    Task
                                                </button>
                                            </li>
                                        </FlipMove>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal isOpen={this.state.isOpen} contentLabel={'Detail Task View'}
                           className="Modal"
                           overlayClassName="Overlay"
                           ariaHideApp={false}>
                        <div className={'row'}>
                            <div className='col span-1-of-4'>
                                <div className="box">
                                    <h2 className="myH2">Creativity</h2>
                                    <progress ref="creativityBar" className="progress" id={'creativityBar'}
                                              value={this.state.creativity}
                                              max="100">30%
                                    </progress>
                                </div>
                            </div>
                            <div className='col span-1-of-4'>
                                <div className="box">
                                    <h2 className="myH2">Teamwork</h2>
                                    <progress ref="teamworkBar" className="progress" id={'teamworkBar'}
                                              value={this.state.teamwork}
                                              max="100">30%
                                    </progress>
                                </div>
                            </div>
                            <div className='col span-1-of-4'>
                                <div className="box">
                                    <h2 className="myH2">Fitness</h2>
                                    <progress ref="fitnessBar" className="progress" id={'fitnessBar'}
                                              value={this.state.fitness} max="100">45%
                                    </progress>
                                </div>
                            </div>
                            <div className='col span-1-of-4'>
                                <div className="box">
                                    <h2 className="myH2">Discipline</h2>
                                    <progress ref="disciplineBar" className="progress" id={'disciplineBar'}
                                              value={this.state.discipline}
                                              max="100">60%
                                    </progress>
                                </div>
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className={'col span-1-of-4'}>
                                <div className="box">
                                    <h2 className="myH2">Research</h2>
                                    <progress ref="researchBar" className="progress" id={'researchBar'}
                                              value={this.state.research}
                                              max="100">75%
                                    </progress>

                                </div>
                            </div>
                            <div className={'col span-1-of-4'}>
                                <div className="box">
                                    <h2 className="myH2">Logic</h2>
                                    <progress ref="logicBar" className="progress" id={'logicBar'}
                                              value={this.state.logic}
                                              max="100">90%
                                    </progress>

                                </div>
                            </div>
                            <div className={'col span-1-of-4'}>
                                <div className="box">
                                    <h2 className="myH2">Leadership</h2>
                                    <progress ref="leadershipBar" className="progress" id={'leadershipBar'}
                                              value={this.state.leadership}
                                              max="100">90%
                                    </progress>
                                </div>
                            </div>
                            <div className={'col span-1-of-4'}>
                                <div className="box">
                                    <h2 className="myH2">Work Ethic</h2>
                                    <progress ref="workEthicBar" className="progress" id={'workEthicBar'}
                                              value={this.state.workEthic}
                                              max="100">90%
                                    </progress>
                                </div>
                            </div>
                        </div>
                        <button className={'btn btn__back'}
                                onClick={() => this.setState({isOpen: false})}>Back
                            to Tasks
                        </button>
                    </Modal>

                    <br/>
                    {this.state.startMessage ? <p>{this.state.startMessage}</p> :
                        null}
                    {this.state.finishMessage ? <p>{this.state.finishMessage}</p> :
                        null}

                    {this.state.showComponent ?
                        <DetailTask id={this.props.task._id} taskName={this.props.task.taskName}/> :
                        null}
                </div>
            </ReactCSSTransitionGroup>

        )

    }


    render() {
        return (
            <div key={this.props.task._id}>
                {this.renderTask()}
            </div>
        );
    }
}