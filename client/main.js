import React from 'react';
import ReactDOM from 'react-dom';
import {routes, onAuthentificationChange} from "../imports/routes/routes";


Tracker.autorun(function () {
    // passes the login status to onAuthentificationChange method
    const isAuthenticated = !!Meteor.userId();
    onAuthentificationChange(isAuthenticated);
});

Meteor.startup(function () {
    Tracker.autorun(function () {
        ReactDOM.render(routes, document.getElementById('app'));
    });
});

