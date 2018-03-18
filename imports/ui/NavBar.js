import React from 'react';
import {Link} from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import {Session} from 'meteor/session';

const history = createHistory();


// NavBar component//

// This component is responsible for navigating the application//

export default class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            encourageName: '',
            encourageNo: 0,
            taskNo: 0
        }
    }

    componentDidMount() {
        $('.js--nav-icon').click(function () {
            var nav = $('.js--main-nav');
            var icon = $('.js--nav-icon i');
            nav.slideToggle(200);
            if (icon.hasClass('ion-navicon-round')) {
                icon.removeClass('ion-navicon-round');
                icon.addClass('ion-close-round');
            } else {
                icon.removeClass('ion-close-round');
                icon.addClass('ion-navicon-round');
            }
        });
        let f1 = setTimeout(myFunc, 500);
        Meteor.subscribe('profiles');
        Meteor.subscribe('stats');
        let that = this;

        function myFunc() {
            let statsCursor = stats.findOne({userId: Meteor.userId()});
            let encourageNumber = statsCursor.encourages;
            let finishedTasksNo = statsCursor.finishedTasks;
            console.log(encourageNumber);
            that.setState({
                encourageNo: encourageNumber,
                taskNo: finishedTasksNo
            });
            let myCursor = profiles.findOne({userId: Meteor.userId()});
            console.log(myCursor);
            let encourageId = myCursor.encourage;
            console.log(encourageId);
            let otherCursor = profiles.findOne({userId: encourageId});
            console.log(otherCursor.name);
            that.setState({
                encourageName: otherCursor.name
            });
        }
    }

    render() {
        return (
            <nav>
                <div className="navBar">
                    <ul className="main--nav js--main-nav">
                        <li><Link to={"/home"}>Home</Link></li>
                        <li><Link to={"/tasksfeed"}>Tasks Feed</Link></li>
                        <li><Link to={"/yourprofile"}>Your Profile</Link></li>
                        <li><Link to={"/yourstats"}>Your Stats</Link></li>
                        <li><Link to={"/tasks"}>Tasks</Link></li>
                        <li><Link to={"/discover"}>Discover</Link></li>
                    </ul>
                    <a class="mobile-nav-icon js--nav-icon"><i class="ion-close-round"></i></a>
                    <div className={'mini-stats'}>
                        {this.state.encourageName ?
                            <p className={'mini-stats-p'}><span
                                className={'mini-stats-span'}>{this.state.encourageName}</span> encourages your recent
                                activity.
                            </p>
                            : <p className={'mini-stats-p'}><span>Currently nobody is encouraging your activity. </span>
                            </p>}
                        <p className={'mini-stats-p'}>
                            <span className={'mini-stats-span'}>{this.state.encourageNo}</span> <span>people have encouraged
                            you lately.</span></p>
                        <p className={'mini-stats-p'}><span>You have finished</span> <span
                            className={'mini-stats-span'}>{this.state.taskNo} tasks.</span></p>
                    </div>
                </div>
            </nav>
        );
    };
};