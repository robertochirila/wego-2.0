import React from 'react';
import ReactDOM from 'react-dom';
import {routes} from "../imports/routes/routes";


Tracker.autorun(function () {
    //const isAuthenticated = !!Meteor.userId();
    //onAuthentificationChange(isAuthenticated);
});

Meteor.startup(function () {
    Tracker.autorun(function () {
        ReactDOM.render(routes, document.getElementById('app'));
    });
});

