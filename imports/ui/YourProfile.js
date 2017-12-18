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
            Meteor.subscribe('myprofile');
            $('#submitButton').css('display', 'none');
            if (myprofile.find().count() > 0) {
                console.log('You have a profile in the db!');
                let myCursor = myprofile.findOne({userId: Meteor.userId()});
                let username = myCursor.name;
                let bio = myCursor.bio;
                let gender = myCursor.gender;
                let age = myCursor.age;
                let reputation = myCursor.reputation;
                let quote = myCursor.quote;
                let status = myCursor.status;
                this.refs.name.value = username;
                this.refs.bio.value = bio;
                this.refs.gender.value = gender;
                this.refs.age.value = age;
                this.refs.reputation.value = reputation;
                this.refs.quote.value = quote;
                this.refs.status.value = status;
            } else {
                // if no records were found in the db
                // all the text fields values are updated to
                // " It's pretty empty here "
                this.refs.name.value = "It's pretty empty here...";
                this.refs.bio.value = "It's pretty empty here...";
                this.refs.gender.value = "It's pretty empty here...";
                this.refs.age.value = "It's pretty empty here...";
                this.refs.reputation.value = "It's pretty empty here...";
                this.refs.quote.value = "It's pretty empty here...";
                this.refs.status.value = "It's pretty empty here...";
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
        const bio = this.refs.bio.value;
        const gender = this.refs.gender.value;
        const age = this.refs.age.value;
        const reputation = this.refs.reputation.value;
        const quote = this.refs.quote.value;
        const status = this.refs.status.value;
        profileInfo.push(name, bio, gender, age, reputation, quote, status);
        //console.log("submit form");
        //console.log(profileInfo);
        if (myprofile.find().count() > 0) {
            Meteor.call('myprofile.update', Meteor.userId(), profileInfo);
        } else {
            console.log("My profile insert");
            Meteor.call('myprofile.insert', Meteor.userId(), profileInfo);
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
                        <input type={"text"} ref={"bio"} placeholder={"Bio"}/>
                        <input type={"text"} ref={"gender"} placeholder={"Your Gender"}/>
                        <input type={"text"} ref={"age"} placeholder={"Your Age"}/>
                        <input type={"text"} ref={"reputation"} placeholder={"Your Reputation"}/>
                        <input type={"text"} ref={"quote"} placeholder={"Your Quote"}/>
                        <input type={"text"} ref={"status"} placeholder={"Status..."}/>
                    </form>
                </div>
            </div>
        );
    }
}