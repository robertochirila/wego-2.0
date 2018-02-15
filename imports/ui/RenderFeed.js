import React from 'react'
import TaskFollower from './TaskFollower'

export default class renderFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idArray: [],
            error: '',
            userName: '',
            userTask: ''
        }
    }

    onRefresh() {
        Meteor.subscribe('tasks');
        Meteor.subscribe('profiles');
        let myFunc = setTimeout(f1, 1000);
        let array = [];
        const id = this.props;
        let that = this;
        //console.log(id);
        //console.log(id.id);
        //console.log(id.id.length);

        function f1() {
            const myCursor = tasks.find().fetch();
            const cursorLength = myCursor.length;
            for (let i = 0; i < cursorLength; i++) {
                //console.log(myCursor[i].users);
                // for each task in the database
                for (let y = 0; y < myCursor[i].users.length; y++) {
                    // for each user that is currently doing this task
                    //console.log(myCursor[i].users[y]);
                    for (let j = 0; j < id.id.length; j++) {
                        // for each user that I follow
                        //console.log('Hereeee', id.id[j]);
                        if (id.id[j] === myCursor[i].users[y]) {
                            // check if the user that I follow is currently doing a task
                            // console.log('FOLLOW');
                            //console.log('Task Number', i, myCursor[i].users[y]);
                            array.push(myCursor[i].users[y]);
                            //console.log(array);
                            that.setState({
                                idArray: array,
                                error: 'No Errors'
                            })
                        }
                    }
                }
            }
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.onRefresh.bind(this)}>Search For Activities</button>
                {this.state.error ?
                    <TaskFollower id={this.state.idArray}/> : undefined}
            </div>
        )

    }
}