import React from 'react';
import NavBar from './NavBar'
import RenderFeed from './RenderFeed'

export default class TasksFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idArray: []
        }
    }

    componentDidMount() {
        Tracker.autorun(() => {
            Meteor.subscribe('following');
            let myFunc = setTimeout(f1, 500);
            let that = this;

            function f1() {
                const array = [];
                const myCursor = following.find().fetch();
                for (let i = 0; i < myCursor[0].follow.length; i++) {
                    array.push(myCursor[0].follow[i]);
                }
                that.setState({
                    idArray: array
                });
            }
        });
    }

    render() {
        return (
            <div>
                <NavBar/>
                <div className={'container'}>
                    <div className={'box'}>
                        <h1 className={'taskH1'}>Your Daily Task Feed</h1>
                        <RenderFeed id={this.state.idArray}/>
                    </div>
                </div>
            </div>
        );
    }
}