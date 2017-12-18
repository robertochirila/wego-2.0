import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

tasks = new Mongo.Collection('Tasks');
mytasks = new Mongo.Collection('myTasks');
profiles = new Mongo.Collection('Profiles');
myprofile = new Mongo.Collection('myProfile');
stats = new Mongo.Collection('myStats');


if (Meteor.isServer) {
    // all the db collections that are published
    Meteor.publish('mytasks', function () {
        return mytasks.find({userId: this.userId});
    });
    Meteor.publish('myprofile', function () {
        return myprofile.find({userId: this.userId});
    });
    Meteor.publish('stats', function () {
        return stats.find({userId: this.userId});
    });
}

Meteor.methods({
    // insertion and validation of a task
    'mytasks.insert'(taskName, duration) {
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
        mytasks.insert({
            userId: this.userId,
            taskName: taskName,
            duration: duration,
            skills: {
                creativity: 6,
                fitness: 3,
                communication: 7,
                problemSolving: 4,
                selfDiscipline: 4,
                selfEducation: 3,
                selfControl: 7,
                leadership: 3,
                research: 3,
                teamwork: 4
            },
            startedAt: myTime,
            finishTime: 0,
            started: false,
            finished: false
        })
    },
    // delete method
    'mytasks.remove'(taskId) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized !');
        } else {
            console.log(taskId);
            mytasks.remove({_id: taskId});
        }
    },
    // method for creating a task
    'mytasks.started'(taskId, duration) {
        if (!this.userId) {
            throw new Meteor.Error("Not authorized");
        } else {
            let time = moment();
            let myTime = time.format("LTS");
            let endTime = time.add(Number(duration), 'hours').format('LTS');
            mytasks.update(taskId, {
                $set: {
                    started: true,
                    startedAt: myTime,
                    finishTime: endTime
                }
            });
        }
    },
    // method for marking that a task was finished
    'mytasks.finished'(taskId) {
        if (!this.userId) {
            throw new Meteor.Error("Not authorized");
        } else {
            mytasks.update(taskId, {
                $set: {finished: true}
            });
        }
    },
    // method that inserts records into the profiles database
    // further validation has to be made
    'myprofile.insert'(userId, profileInfo) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized');
        } else {
            console.log(profileInfo);
            const name = profileInfo[0];
            const bio = profileInfo[1];
            const gender = profileInfo[2];
            const age = Number(profileInfo[3]);
            const reputation = profileInfo[4];
            const quote = profileInfo[5];
            const status = profileInfo[6];
            try {
                new SimpleSchema({
                    name: {
                        type: String
                    },
                    bio: {
                        type: String
                    },
                    gender: {
                        type: String
                    },
                    age: {
                        type: Number
                    },
                    reputation: {
                        type: String
                    },
                    quote: {
                        type: String
                    },
                    status: {
                        type: String
                    }
                }).validate({name, bio, gender, age, reputation, quote, status});
            } catch (e) {
                throw new Meteor.Error("One of the values are incorrect!");
            }
            console.log('My profile server insertion');
            myprofile.insert({
                userId: userId,
                name: name,
                bio: bio,
                gender: gender,
                age: age,
                reputation: reputation,
                quote: quote,
                status: status
            });
        }
    },
    'stats.insert'(userId, taskId) {
        // stats insertion
        // this gets called only if you don't have any
        // stats in the collection
        let myCursor = mytasks.findOne({_id: taskId}, {userId: userId});
        stats.insert({
            userId: userId,
            skills: {
                creativity: myCursor.skills.creativity,
                fitness: myCursor.skills.fitness,
                selfEducation: myCursor.skills.selfEducation,
                research: myCursor.skills.research,
                communication: myCursor.skills.communication,
                problemSolving: myCursor.skills.problemSolving,
                selfDiscipline: myCursor.skills.selfDiscipline,
                leadership: myCursor.skills.leadership,
                teamwork: myCursor.skills.teamwork,
                selfControl: myCursor.skills.selfControl
            },
            healthIndicators: {
                dopamineRush: 'Dopamine Rush Level',
                willpower: 'Willpower Level',
                comfortZone: 'Comfort Zone Level'
            },
            reputation: '2',
            finishedTasks: '4',
            status: 'idle'

        });
    },
    'stats.update'(userId, taskId) {
        // update method for the stats page
        // updates all the fields in the stats collection
        // with the skills from the tasks
        let myCursor = mytasks.findOne({_id: taskId}, {userId: userId});
        stats.update({
                userId: userId
            },
            {
                $inc: {
                    creativity: myCursor.skills.creativity,
                    fitness: myCursor.skills.fitness,
                    selfEducation: myCursor.skills.selfEducation,
                    research: myCursor.skills.research,
                    communication: myCursor.skills.communication,
                    problemSolving: myCursor.skills.problemSolving,
                    selfDiscipline: myCursor.skills.selfDiscipline,
                    leadership: myCursor.skills.leadership,
                    teamwork: myCursor.skills.teamwork,
                    selfControl: myCursor.skills.selfControl
                }

            });
    }
});