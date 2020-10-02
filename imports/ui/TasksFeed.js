import React from 'react';
import NavBar from './NavBar'
import RenderFeed from './RenderFeed'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
                        <ReactCSSTransitionGroup transitionName="opacityAnimation" transitionAppear={true}
                                                 transitionAppearTimeout={2000} transitionEnter={false}
                                                 transitionLeave={false}>
                            <h1 className={'taskH1'}>Your Daily Task Feed</h1>
                        </ReactCSSTransitionGroup>
                        <ReactCSSTransitionGroup transitionName="moveUpAnimation" transitionAppear={true}
                                                 transitionAppearTimeout={3000} transitionEnter={false}
                                                 transitionLeave={false}>
                            <RenderFeed id={this.state.idArray}/>
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
            </div>
        );
    }
}