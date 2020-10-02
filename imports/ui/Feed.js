import React from 'react'
import FlipMove from 'react-flip-move';


let userTask = '';
let userName = '';

export default class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idArray: this.props.feed,
            userName: '',
            userTask: '',
            timeout: ''
        };
    }

    componentDidMount() {
        Meteor.subscribe('tasks', 'profiles');
        let myFunc = setTimeout(f1, 500);
        let that = this;

        function f1() {
            const id = that.state.idArray;
            const myCursor1 = tasks.findOne({users: id});
            userTask = myCursor1.name;
            console.log(userTask);
            const myCursor2 = profiles.findOne({userId: id});
            userName = myCursor2.name;
            console.log(userName);
            that.setState({
                userName: userName,
                userTask: userTask,
                timeout: 'ok'
            });
        }

    }

    onEncourage() {
        Meteor.subscribe('stats');
        let f1 = setTimeout(myFunc, 1000);
        console.log('Encourage user! ');
        console.log(this.state.userName);
        let userName = this.state.userName;
        let myCursor = profiles.findOne({name: userName});
        let userId = myCursor.userId;
        //console.log(myCursor.userId);
        Meteor.call('profile.addEncourage', userId, Meteor.userId());

        function myFunc() {
            Meteor.call('stats.updateEncourage', myCursor.userId);
            Meteor.call('profile.deleteEncourage', Meteor.userId());
        }

        // insert the id in the encourage field in the profile

    }


    render() {
        return (
            <div className={'box'}>
                <FlipMove duration={750} easing="ease-out">
                    {this.state.timeout ?
                        <li className={'task-feed-list-item'}><p>{this.state.userName} is
                            currently: {this.state.userTask}</p>
                            <button className={'btn btn__encourage'} onClick={this.onEncourage.bind(this)}>Encourage
                            </button>
                        </li>
                        : undefined}

                </FlipMove>
            </div>
        )
    }
}