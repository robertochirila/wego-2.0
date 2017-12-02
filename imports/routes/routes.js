//import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Login from '../ui/Login';
import SignUp from '../ui/SignUp';
import Home from '../ui/Home';
import TasksFeed from '../ui/TasksFeed';
import YourProfile from '../ui/YourProfile';
import YourStats from '../ui/YourStats';
import Tasks from '../ui/Tasks';

export const routes = (
    <BrowserRouter>
        <Switch>
            <Route exact path={'/'} component={Login}/>
            <Route exact path={'/signup'} component={SignUp}/>
            <Route exact path={'/home'} component={Home}/>
            <Route exact path={'/tasksfeed'} component={TasksFeed}/>
            <Route exact path={'/yourprofile'} component={YourProfile}/>
            <Route exact path={'/yourstats'} component={YourStats}/>
            <Route exact path={'/tasks'} component={Tasks}/>
        </Switch>
    </BrowserRouter>
);