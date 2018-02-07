import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class DisplayUserProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Meteor.subscribe('following');
        let userId = this.props.userProfile.userId;
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
                    <div className="col span-1-of-3">
                        <ReactCSSTransitionGroup transitionName="projectAnimation" transitionAppear={true}
                                                 transitionAppearTimeout={1500} transitionEnter={false}
                                                 transitionLeave={false}>
                            <div className="box colored">
                                <div className="box" id={"box1"}>
                                    <figure className="profile-photo-figure">
                                        <img src="../../img/icon.png" className="round-photo"/>
                                    </figure>

                                    <button className="btn edit" onClick={this.onFollow.bind(this)}>Follow
                                    </button>
                                    <div className="row">
                                        <div className="col span-2-of-2">
                                            <h1>Name</h1>
                                            <span id={"name"}>{this.props.userProfile.name}</span>
                                            <h1>Quote</h1>
                                            <span id={"quote"}>{this.props.userProfile.quote}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col span-1-of-2">
                                            <h3>Gender</h3>
                                            <span id={"gender"}>{this.props.userProfile.gender}</span>
                                        </div>
                                        <div className="col span-1-of-2">
                                            <h3>Age</h3>
                                            <span id={"age"}>{this.props.userProfile.age}</span>
                                        </div>
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