import React from 'react'

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

    render() {
        return (
            <div>
                {this.state.timeout ?
                    <li><p>{this.state.userName} is currently: {this.state.userTask}</p></li> : undefined}
            </div>
        )
    }
}