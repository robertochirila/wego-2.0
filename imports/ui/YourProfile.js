import React from 'react';
import NavBar from './NavBar';
import {Meteor} from 'meteor/meteor';

export default class YourProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // checks if I have any profile records in the db
        // if so, it retrieves all the values from the collection
        // and updates the text fields
        Tracker.autorun(() => {
            Meteor.subscribe('profiles');
            $('#submitButton').css('display', 'none');
            if (profiles.find().count() > 0) {
                myCursor = profiles.findOne({userId: Meteor.userId()});
                let username = myCursor.name;
                let aboutYou = myCursor.aboutYou;
                let gender = myCursor.gender;
                let age = myCursor.age;
                let education = myCursor.education;
                let quote = myCursor.quote;
                this.refs.name.value = username;
                this.refs.aboutYou.value = aboutYou;
                this.refs.gender.value = gender;
                this.refs.age.value = age;
                this.refs.education.value = education;
                this.refs.quote.value = quote;
            } else {
                // if no records were found in the db
                // all the text fields values are updated to
                // " It's pretty empty here "
                this.refs.name.value = "It's pretty empty here...";
                this.refs.aboutYou.value = "It's pretty empty here...";
                this.refs.gender.value = "It's pretty empty here...";
                this.refs.age.value = "It's pretty empty here...";
                this.refs.education.value = "It's pretty empty here...";
                this.refs.quote.value = "It's pretty empty here...";
            }
        });
    }

    onEdit(e) {
        // here all the text fields should become editable
        e.preventDefault();
        $('#editButton').css('display', 'none');
        $('#submitButton').css('display', 'inline');
        console.log('Here you should be able to edit first profile section!');
    }

    onSubmit(e) {
        // here the insertion/update will occur
        e.preventDefault();
        let profileInfo = [];
        const name = this.refs.name.value;
        const aboutYou = this.refs.aboutYou.value;
        const gender = this.refs.gender.value;
        const age = this.refs.age.value;
        const education = this.refs.education.value;
        const quote = this.refs.quote.value;
        profileInfo.push(name, aboutYou, gender, age, education, quote);
        //console.log("submit form");
        //console.log(profileInfo);
        if (profiles.find().count() > 0) {
            Meteor.call('profiles.update', Meteor.userId(), profileInfo);
        } else {
            Meteor.call('profiles.insert', Meteor.userId(), profileInfo);
        }
        $('#editButton').css('display', 'inline');
    }

    render() {
        return (
            <div>
                <NavBar/>
                <p>This is the Profile component.</p>
                <div>
                    <p>Here the profile photo should be displayed.</p>
                    <p>Here the reputation should be displayed.</p>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <button id={"editButton"} onClick={this.onEdit.bind(this)}>Edit</button>
                        <button id={"submitButton"}>Submit</button>
                        <input type={"text"} ref={"name"} placeholder={"Your Name"}/>
                        <input type={"text"} ref={"aboutYou"} placeholder={"About You"}/>
                        <input type={"text"} ref={"gender"} placeholder={"Your Gender"}/>
                        <input type={"text"} ref={"age"} placeholder={"Your Age"}/>
                        <input type={"text"} ref={"education"} placeholder={"Your Education"}/>
                        <input type={"text"} ref={"quote"} placeholder={"Your Quote"}/>
                    </form>
                </div>
            </div>
        );
    }
}