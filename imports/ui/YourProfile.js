import React from 'react';
import NavBar from './NavBar';
import {Meteor} from 'meteor/meteor';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


export default class YourProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // checks if I have any profile records in the db
        // if so, it retrieves all the values from the collection
        // and updates the text fields
        $("#editButton").css("display", "none");
        $('form').css('display', 'none');
        Tracker.autorun(() => {
            Meteor.subscribe('myprofile');
            if (myprofile.find().count() > 0) {
                console.log('You have a profile in the db!');
                let myCursor = myprofile.findOne({userId: Meteor.userId()});
                let username = myCursor.name;
                let gender = myCursor.gender;
                let age = myCursor.age;
                let quote = myCursor.quote;
                $("#name").text(username);
                $("#gender").text(gender);
                $("#age").text(age);
                $("#quote").text(quote);
                this.refs.name.value = username;
                this.refs.gender.value = gender;
                this.refs.age.value = age;
                this.refs.quote.value = quote;
            } else {
                // if no records were found in the db
                // all the text fields values are updated to
                // " It's pretty empty here "
                this.refs.name.value = "It's pretty empty here...";
                this.refs.gender.value = "It's pretty empty here...";
                this.refs.age.value = "It's pretty empty here...";
                this.refs.quote.value = "It's pretty empty here...";
            }
        });
    }

    onEdit(e) {
        // here all the text fields should become editable
        e.preventDefault();
        $(':input').removeAttr("readonly");
        $("#editButton").css("display", "inline");
        $('form').css('display', 'inline-block');
        console.log('Here you should be able to edit first profile section!');
    }

    onSubmit(e) {
        // here the insertion/update will occur
        e.preventDefault();
        let profileInfo = [];
        const name = this.refs.name.value;
        const gender = this.refs.gender.value;
        const age = this.refs.age.value;
        const quote = this.refs.quote.value;
        profileInfo.push(name, gender, age, quote);
        //console.log("submit form");
        //console.log(profileInfo);
        if (myprofile.find().count() > 0) {
            Meteor.call('myprofile.update', Meteor.userId(), profileInfo);
        } else {
            console.log("My profile insert");
            Meteor.call('myprofile.insert', Meteor.userId(), profileInfo);
        }
    }

    render() {
        return (
            <div className="profile--page">
                <NavBar/>
                <div className="row">
                    <div className="col span-1-of-3">
                    </div>
                    <div className="col span-1-of-3">
                        <ReactCSSTransitionGroup transitionName="projectAnimation" transitionAppear={true}
                                                 transitionAppearTimeout={1500} transitionEnter={false}
                                                 transitionLeave={false}>
                            <div className="box box__colored">
                                <div className="box" id={"box1"}>
                                    <figure className="profile-photo-figure">
                                        <img src="../../img/icon.png" className="round--photo"/>
                                    </figure>

                                    <button className="btn btn__edit" onClick={this.onEdit.bind(this)}>Edit Profile
                                    </button>
                                    <div className="row">
                                        <div className="col span-2-of-2">
                                            <h1>Name</h1>
                                            <span id={"name"}>Value</span>
                                            <h1>Quote</h1>
                                            <span id={"quote"}>Value</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col span-1-of-2">
                                            <h3>Gender</h3>
                                            <span id={"gender"}>Value</span>
                                        </div>
                                        <div className="col span-1-of-2">
                                            <h3>Age</h3>
                                            <span id={"age"}>Value</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </ReactCSSTransitionGroup>
                    </div>
                    <div className="col span-1-of-3">
                        <div className={'box'}>
                            <ReactCSSTransitionGroup transitionName="loginAnimation" transitionAppear={true}
                                                     transitionAppearTimeout={2000} transitionEnter={false}
                                                     transitionLeave={false}>
                                <form onSubmit={this.onSubmit.bind(this)} id={"form"} className={'profile--form'}>
                                    <div className="row">
                                        <label className={'profile__label'}>Name</label>
                                    </div>
                                    <div className={'row'}>
                                        <input type={"text"} ref={"name"} placeholder={"Your Name"} readOnly
                                               className={'profile__input'}/>
                                    </div>
                                    <div className="row">
                                        <label className={'profile__label'}>Gender</label>
                                    </div>
                                    <div className={'row'}>
                                        <input type={"text"} ref={"gender"} placeholder={"Your Gender"} readOnly
                                               className={'profile__input'}/>
                                    </div>
                                    <div className="row">
                                        <label className={'profile__label'}>Age</label>
                                    </div>
                                    <div className={'row'}>
                                        <input type={"text"} ref={"age"} placeholder={"Your Age"} readOnly
                                               className={'profile__input'}/>
                                    </div>
                                    <div className="row">
                                        <label className={'profile__label'}>Quote</label>
                                    </div>
                                    <div className={'row'}>
                                        <input type={"text"} ref={"quote"} placeholder={"Your Quote"} readOnly
                                               className={'profile__input'}/>
                                    </div>
                                    <div className="row">
                                        <div className="box">
                                            <button id={"editButton"} className="btn btn__submit"
                                                    onClick={this.onSubmit.bind(this)}>Submit Profile
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </ReactCSSTransitionGroup>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}