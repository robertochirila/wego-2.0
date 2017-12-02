import { Meteor } from 'meteor/meteor';
import '../imports/api/userValidation';

Meteor.startup(() => {
  // code to run on server at startup
    console.log("Server is up and running!");
});
