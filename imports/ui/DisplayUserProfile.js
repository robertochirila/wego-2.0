import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Meteor} from "meteor/meteor";


export default class DisplayUserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: ''
        }
    }

    componentDidMount() {
        Meteor.subscribe('following');
        Meteor.subscribe('profiles');
        let userId = this.props.userProfile.userId;
        let myCursor1 = profiles.findOne({userId: userId});
        let status = myCursor1.status;
        this.setState({
            status: status
        });
        let myCursor = following.find({user: Meteor.userId()}).count();
        console.log(myCursor);
        if (myCursor.length === 1) {
            console.log('You have a following collection ');
        } else {
            console.log('following insertion');
            Meteor.call('following.insert', Meteor.userId());
        }
    };

    onFollow(event) {
        event.preventDefault();
        console.log(this.props.userProfile.userId);
        let userId = this.props.userProfile.userId;
        let collectionId = following.find().fetch();
        console.log(collectionId[0]._id);
        let myCursor = following.find().count();
        if (myCursor === 0) {
        } else {
            console.log('Update following');
            Meteor.call('following.update', userId, collectionId[0]._id);
        }

    }

    render() {
        return (
            <div key={this.props.userProfile._id} className="header-profile">
                <div className="row">
                    <div className="col span-1-of-3">
                    </div>
                    <div className={'col span-1-of-3'}>
                        <ReactCSSTransitionGroup transitionName="moveRightAnimation" transitionAppear={true}
                                                 transitionAppearTimeout={1500} transitionEnter={false}
                                                 transitionLeave={false}>

                            <div className="box__colored">
                                <div className={'col span-1-of-3'}>
                                    <div className="box" id={"box1"}>
                                        <figure className="profile-photo-figure">
                                            <img src="../../img/girl.jpeg" className="round--photo"/>
                                            <h3>{this.state.status}</h3>
                                        </figure>
                                    </div>
                                    <div className={'box'}>
                                        <button className="btn btn__login" onClick={this.onFollow.bind(this)}>Follow
                                        </button>
                                    </div>
                                </div>
                                <div className="col span-2-of-3">
                                    <h1>{this.props.userProfile.name}</h1>
                                    <span id={"quote"}>{this.props.userProfile.quote}</span>
                                </div>
                                <div className="row">
                                    <div className="col span-1-of-2">
                                        <h3>{this.props.userProfile.gender}</h3>
                                    </div>
                                    <div className="col span-1-of-2">
                                        <h3>{this.props.userProfile.age} years old.</h3>
                                    </div>
                                </div>
                            </div>
                        </ReactCSSTransitionGroup>
                    </div>
                    <div className="col span-1-of-3">
                    </div>
                </div>
            </div>
        );
    }
}