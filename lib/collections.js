import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';
import {Meteor} from "meteor/meteor";

tasks = new Mongo.Collection('Tasks');
mytasks = new Mongo.Collection('myTasks');
profiles = new Mongo.Collection('Profiles');
myprofile = new Mongo.Collection('myProfile');
stats = new Mongo.Collection('myStats');
projects = new Mongo.Collection('Projects');
following = new Mongo.Collection('Following');


if (Meteor.isServer) {
    // all the db collections that are published
    Meteor.publish('mytasks', function () {
        return mytasks.find({userId: this.userId, finished: false});
    });
    Meteor.publish('myprofile', function () {
        return myprofile.find({userId: this.userId});
    });
    Meteor.publish('stats', function () {
        return stats.find({userId: this.userId});
    });
    Meteor.publish('projects', function () {
        return projects.find();
    });
    Meteor.publish('profiles', function () {
        return profiles.find();
    });
    Meteor.publish('following', function () {
        return following.find({user: this.userId});
    });
    Meteor.publish('tasks', function () {
        return tasks.find()
    });
}

Meteor.methods({
    'tasks.update'(taskName, userId) {
        tasks.update({name: taskName}, {
                $push: {users: userId}
            }
        )
    },
    'following.insert'(user) {
        following.insert({
            user: user,
            follow: []
        });
    },
    'following.update'(userId, collectionId) {
        following.update({_id: collectionId}, {
            $push: {follow: userId}
        });
    },
    'projects.insert'(projectName, userId) {
        let now = moment().format('MMM Do YY');
        let time = moment();
        let endTime = time.add(Number(12), 'hours').format('HH:mm:ss');
        projects.insert({
            projectName: projectName,
            projectDuration: 150,
            startedAt: now,
            expiresIn: endTime,
            people: 0,
            users: []
        });
    },
    'projects.update'(projectId, userId) {
        let myCursor = projects.findOne({_id: projectId});
        let myUsers = myCursor.users;
        //console.log(myUsers);

        if (!myUsers.includes(userId)) {
            projects.update(projectId, {
                $push: {users: userId},
                $inc: {
                    people: 1
                }
            });
        }
    },
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
        let myTime = time.format("HH:mm:ss");
        let myCursor = tasks.findOne({name: taskName});
        mytasks.insert({
            userId: this.userId,
            taskName: taskName,
            duration: duration,
            skills: {
                creativity: myCursor.skills.creativity,
                teamwork: myCursor.skills.teamwork,
                fitness: myCursor.skills.fitness,
                discipline: myCursor.skills.discipline,
                research: myCursor.skills.research,
                logic: myCursor.skills.logic,
                leadership: myCursor.skills.leadership,
                workEthic: myCursor.skills.workEthic
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
            let myTime = time.format("HH:mm:ss");
            let endTime = time.add(Number(duration), 'hours').format('HH:mm:ss');
            mytasks.update(taskId, {
                $set: {
                    started: true,
                    startedAt: myTime,
                    finishTime: endTime
                }
            });
            profiles.update({userId: this.userId}, {
                $set: {status: 'Active'}
            })
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
            profiles.update({userId: this.userId}, {
                $set: {status: 'Idle'}
            });
        }
    },
    'profiles.insert'(userId, profileInfo) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized');
        } else {
            console.log(profileInfo);
            const name = profileInfo[0];
            const gender = profileInfo[1];
            const age = Number(profileInfo[2]);
            const quote = profileInfo[3];
            const email = profileInfo[4];
            profiles.insert({
                userId: userId,
                name: name,
                email: email,
                gender: gender,
                age: age,
                quote: quote,
                encourage: '',
                status: 'Idle'
            });
        }
    },
    'profile.addEncourage'(userId, encourageId) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorised');
        } else {
            profiles.update({userId: userId}, {
                $set: {encourage: encourageId}
            });
        }
    },
    'profile.deleteEncourage'(userId) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorised');
        } else {
            profiles.update({userId}, {
                $set: {
                    encourage: ''
                }
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
            const gender = profileInfo[1];
            const age = Number(profileInfo[2]);
            const quote = profileInfo[3];
            try {
                new SimpleSchema({
                    name: {
                        type: String
                    },
                    gender: {
                        type: String
                    },
                    age: {
                        type: Number
                    },
                    quote: {
                        type: String
                    }
                }).validate({name, gender, age, quote});
            } catch (e) {
                throw new Meteor.Error("One of the values are incorrect!");
            }
            console.log('My profile server insertion');
            let myCursor = Meteor.users.findOne({_id: userId});
            const email = myCursor.emails[0].address;
            profileInfo.push(email);
            Meteor.call('profiles.insert', Meteor.userId(), profileInfo);
            console.log(myCursor);
            console.log(email);
            myprofile.insert({
                userId: userId,
                name: name,
                email: email,
                gender: gender,
                age: age,
                quote: quote,
                projects: []
            });
        }
    },
    'myprofile.updateProjects'(projectdId, userId) {
        myprofile.update({userId: userId}, {
            $push: {projects: projectdId}
        });
    },
    'stats.insert'(userId, taskId) {
        // stats insertion
        // this gets called only if you don't have any
        // stats in the collection
        let myCursor = mytasks.findOne({_id: taskId, userId: userId});
        stats.insert({
            userId: userId,
            creativity: myCursor.skills.creativity,
            teamwork: myCursor.skills.teamwork,
            fitness: myCursor.skills.fitness,
            discipline: myCursor.skills.discipline,
            research: myCursor.skills.research,
            logic: myCursor.skills.logic,
            leadership: myCursor.skills.leadership,
            workEthic: myCursor.skills.workEthic,
            healthIndicators: {
                dopamineRush: 'Dopamine Rush Level',
                willpower: 'Willpower Level',
                comfortZone: 'Comfort Zone Level'
            },
            reputation: '2',
            finishedTasks: 0,
            encourages: 1

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
                    teamwork: myCursor.skills.teamwork,
                    fitness: myCursor.skills.fitness,
                    discipline: myCursor.skills.discipline,
                    research: myCursor.skills.research,
                    logic: myCursor.skills.logic,
                    leadership: myCursor.skills.leadership,
                    workEthic: myCursor.skills.workEthic,
                    finishedTasks: 1
                }
            });
    },
    'stats.updateEncourage'(userId) {
        stats.update({userId: userId}, {
            $inc: {
                encourages: 1
            }
        });
    },
    'stats.updateFinishedTasks'(userId) {
        stats.update({userId: userId}, {
            $inc: {
                finishedTasks: 1
            }
        });
    }
});