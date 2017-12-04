import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

tasks = new Mongo.Collection('tasks');
profiles = new Mongo.Collection('profiles');


if (Meteor.isServer) {
    Meteor.publish('tasks', function () {
        return tasks.find({userId: this.userId});
    });
}

Meteor.methods({
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
        tasks.insert({
            userId: this.userId,
            taskName: taskName,
            duration: duration,
            started: false,
            finished: false
        })
    },
    'tasks.remove'(taskId) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized !');
        } else {
            tasks.remove({started: false}._id);
        }
    },
    'tasks.started'(taskId) {
        if (!this.userId) {
            throw new Meteor.Error("Not authorized");
        } else {
            tasks.update(taskId, {
                $set: {started: true}
            });
        }
    },
    'tasks.finished'(taskId) {
        if (!this.userId) {
            throw new Meteor.Error("Not authorized");
        } else {
            tasks.update(taskId, {
                $set: {finished: true}
            });
        }
    }

});