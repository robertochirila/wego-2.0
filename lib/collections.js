import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

tasks = new Mongo.Collection('tasks');
profiles = new Mongo.Collection('profiles');
stats = new Mongo.Collection('stats');


if (Meteor.isServer) {
    // all the db collections that are published
    Meteor.publish('tasks', function () {
        return tasks.find({userId: this.userId});
    });
    Meteor.publish('profiles', function () {
        return profiles.find({userId: this.userId});
    });
    Meteor.publish('stats', function () {
        return stats.find({userId: this.userId});
    });
}

Meteor.methods({
    // insertion and validation of a task
    'tasks.insert'(taskName, duration) {
        if (!this.userId) {
            throw new Meteor.Error("Not authorized to create a task without logging in !");
        }
        try {
            new SimpleSchema({
                taskName: {
                    type: String
                },
                duration: {
                    type: Number
                }
            }).validate({taskName, duration});
        } catch (e) {
            throw new Meteor.Error("Enter valid values for task name and duration !", e.message);
        }
        let time = moment();
        let myTime = time.format("LTS");
        tasks.insert({
            userId: this.userId,
            taskName: taskName,
            duration: duration,
            skills: {
                creativity: 6,
                analytics: 3,
                fitness: 7,
                research: 4,
                communication: 4,
                problemSolving: 3,
                timeManagement: 7,
                leadership: 3,
                selfMotivation: 3,
                teamwork: 4
            },
            startedAt: myTime,
            finishTime: 0,
            started: false,
            finished: false
        })
    },
    // delete method
    'tasks.remove'(taskId) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized !');
        } else {
            console.log(taskId);
            tasks.remove({_id: taskId});
        }
    },
    // method for creating a task
    'tasks.started'(taskId, duration) {
        if (!this.userId) {
            throw new Meteor.Error("Not authorized");
        } else {
            let time = moment();
            let myTime = time.format("LTS");
            let endTime = time.add(Number(duration), 'hours').format('LTS');
            tasks.update(taskId, {
                $set: {
                    started: true,
                    startedAt: myTime,
                    finishTime: endTime
                }
            });
        }
    },
    // method for marking that a task was finished
    'tasks.finished'(taskId) {
        if (!this.userId) {
            throw new Meteor.Error("Not authorized");
        } else {
            tasks.update(taskId, {
                $set: {finished: true}
            });
        }
    },
    // method that inserts records into the profiles database
    // further validation has to be made
    'profiles.insert'(userId, profileInfo) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized');
        } else {
            console.log(profileInfo[0]);
            const name = profileInfo[0];
            const aboutYou = profileInfo[1];
            const gender = profileInfo[2];
            const age = Number(profileInfo[3]);
            const education = profileInfo[4];
            const quote = profileInfo[5];
            try {
                new SimpleSchema({
                    name: {
                        type: String
                    },
                    aboutYou: {
                        type: String
                    },
                    gender: {
                        type: String
                    },
                    age: {
                        type: Number
                    },
                    education: {
                        type: String
                    },
                    quote: {
                        type: String
                    }
                }).validate({name, aboutYou, gender, age, education, quote});
            } catch (e) {
                throw new Meteor.Error("One of the values are incorrect!");
            }
            profiles.insert({
                userId: userId,
                name: name,
                aboutYou: aboutYou,
                gender: gender,
                age: age,
                education: education,
                quote: quote
            });
        }
    },
    'stats.insert'(userId, taskId) {
        // stats insertion
        // this gets called only if you don't have any
        // stats in the collection
        let myCursor = tasks.findOne({_id: taskId}, {userId: userId});
        stats.insert({
            userId: userId,
            creativity: myCursor.skills.creativity,
            analytics: myCursor.skills.analytics,
            fitness: myCursor.skills.fitness,
            research: myCursor.skills.research,
            communication: myCursor.skills.communication,
            problemsolving: myCursor.skills.problemSolving,
            timemanagement: myCursor.skills.timeManagement,
            leadership: myCursor.skills.leadership,
            teamwork: myCursor.skills.teamwork,
            selfmotivation: myCursor.skills.selfMotivation
        });
    },
    'stats.update'(userId, taskId) {
        // update method for the stats page
        // updates all the fields in the stats collection
        // with the skills from the tasks
        let myCursor = tasks.findOne({_id: taskId}, {userId: userId});
        stats.update({
                userId: userId
            },
            {
                $inc: {
                    creativity: myCursor.skills.creativity,
                    analytics: myCursor.skills.analytics,
                    fitness: myCursor.skills.fitness,
                    research: myCursor.skills.research,
                    communication: myCursor.skills.communication,
                    problemsolving: myCursor.skills.problemSolving,
                    timemanagement: myCursor.skills.timeManagement,
                    leadership: myCursor.skills.leadership,
                    teamwork: myCursor.skills.teamwork,
                    selfmotivation: myCursor.skills.selfMotivation
                }
            });
    }
});