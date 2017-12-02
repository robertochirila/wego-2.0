import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';


Accounts.validateNewUser((user) => {
    console.log("This is the new user!", user);
    let email = user.emails[0].address;
    try {
        new SimpleSchema({
            email: {
                type: String,
                regEx: SimpleSchema.RegEx.Email
            }
        }).validate({email});

    } catch (e) {
        throw new Meteor.Error("Please provide a valid email!", e.message);
    }
    return true;
});

