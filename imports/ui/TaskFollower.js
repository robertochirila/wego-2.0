import React from 'react'
import Feed from './Feed'

export default class TaskFollower extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Meteor.subscribe('tasks');
        Meteor.subscribe('profiles');


    }

    renderFeed() {
        let array = this.props.id;
        //console.log(array);
        if (array.length === 0) {
            return (
                <div>
                    <p>It's quite in here !</p>
                </div>
            )
        } else {
            // otherwise it accesses the props and maps all its content
            // then it returns for each task object a Task component
            console.log(array);
            return array.map(function (feed) {
                return <Feed key={feed._id} feed={feed}/>
            });
        }
    }

    render() {
        return (
            <div>
                <ul>
                    {this.renderFeed()}
                </ul>
            </div>
        )
    }
}