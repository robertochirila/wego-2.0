import React from 'react';
import UserProfile from './UserProfile';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class discoverPeople extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            peopleArray: []
        }
    }

    onSubmit(e) {
        e.preventDefault();
        let userEmail = this.refs.emailRef.value;
        //console.log(userEmail);
        let myCursor = profiles.find({email: userEmail}).fetch();
        //console.log(myCursor);
        this.setState({
            peopleArray: myCursor
        });
    }

    render() {
        return (
            <div className="row">
                <div className='col span-2-of-2'>
                    <ReactCSSTransitionGroup transitionName="opacityAnimation" transitionAppear={true}
                                             transitionAppearTimeout={2000} transitionLeave={false}>
                        <h1 className={'discover--header'}>Discover People</h1>
                    </ReactCSSTransitionGroup>
                    <ReactCSSTransitionGroup transitionName="moveRightAnimation" transitionAppear={true}
                                             transitionAppearTimeout={2000} transitionLeave={false}>
                        <form onSubmit={this.onSubmit.bind(this)} className={'discover--form'}>
                            <div className="row">
                                <div className={'box'}>
                                    <input type='text' ref='emailRef' placeholder='Search...'
                                           className={'discover--input'}/>
                                </div>
                            </div>
                            <div className='row'>
                                <button className='btn btn__discover'>Discover</button>
                            </div>
                        </form>
                    </ReactCSSTransitionGroup>
                        <UserProfile user={this.state.peopleArray}/>
                </div>
            </div>
        );
    }
}