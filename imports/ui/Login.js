import React from 'react';
import {Link} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: ""
        }
    }

    componentDidMount() {
    }

    onSubmit(e) {
        e.preventDefault();
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();
        this.setState({
            error: ""
        });

        Meteor.loginWithPassword({email}, password, (err) => {
            console.log("Login attempt!");
            if (err) {
                this.setState({error: "Login Error"});
            } else {
                this.setState({error: ""});
                this.props.history.push('/home');
            }
        });
    }

    render() {
        return (
            <div className="login--page">
                <div className='row'>
                    <div className="col span-2-of-2">
                        <ReactCSSTransitionGroup transitionName="loginAnimation" transitionAppear={true}
                                                 transitionAppearTimeout={2000} transitionEnter={false}
                                                 transitionLeave={false}>
                            <div className='box'>
                                <form onSubmit={this.onSubmit.bind(this)} className={'login--form'}>
                                    <div className="row">
                                        <label className={'login__label'}>Email</label>
                                    </div>
                                    <div className="row">
                                        <input type={"email"} ref={"email"} placeholder={"Email Address"}
                                               className={'login__input'}/>
                                    </div>
                                    <div className="row">
                                        <label className={'login__label'}>Password</label>
                                    </div>
                                    <div className='row'>
                                        <input type={"password"} ref={"password"} placeholder={"Password"}
                                               className={'login__input'}/>
                                    </div>
                                    <div className='row'>
                                        <button className="btn btn__login">Login</button>
                                    </div>
                                    <div className='row'>
                                        <Link className={'link'} to="/signup">Sign Up</Link>
                                    </div>
                                </form>
                            </div>
                        </ReactCSSTransitionGroup>
                    </div>

                    <div className="hero-text-box">
                        <ReactCSSTransitionGroup transitionName="heroAnimation" transitionAppear={true}
                                                 transitionAppearTimeout={2000} transitionEnter={false}
                                                 transitionLeave={false}>
                            <h1 className={'hero'}>Wego <br/> Inventing Productive Socialising <br/> Since 2018 <span className={'dot'}>.</span></h1>
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
            </div>
        );
    }
}
