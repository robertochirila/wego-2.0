import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: ""
        };
    }

    onSubmit(e) {
        e.preventDefault();
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();
        console.log(password);
        console.log(email);
        if (password.length > 5) {
            Accounts.createUser({email, password}, (err) => {
                console.log("Create Account attempt!");
                if (err) {
                    this.setState({
                        error: "Error on creating account!"
                    })
                } else {
                    this.setState({
                        error: ""
                    });
                    this.props.history.push('/home');
                }
            });
        } else {
            this.setState({
                error: "Password needs to have more than 5 characters."
            });
        }
    }

    render() {
        return (
            <div className="login--page">
                <div className="row">
                    <div className="col span-2-of-2">
                        <ReactCSSTransitionGroup transitionName="loginAnimation" transitionAppear={true}
                                                 transitionAppearTimeout={2000} transitionEnter={false}
                                                 transitionLeave={false}>
                            <div className={'box'}>
                                <form onSubmit={this.onSubmit.bind(this)} noValidate className={'login--form'}>
                                    <div className="row">
                                        <label className={'login__label'}>Email</label>
                                    </div>
                                    <div className="row">
                                        <input type={"email"} ref={"email"} placeholder={"Fill in email"}
                                               className={'login__input'}/>
                                    </div>
                                    <div className="row">
                                        <label className={'login__label'}>Password</label>
                                    </div>
                                    <div className="row">
                                        <input type={"password"} ref={"password"} placeholder={""}
                                               className={'login__input'}/>
                                    </div>
                                    <div className="row">
                                        <button className="btn btn__signUp">Sign Up</button>
                                    </div>
                                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                                </form>
                            </div>
                        </ReactCSSTransitionGroup>
                    </div>
                    <div className="hero-text-box">
                        <h1 className={'hero'}>Wego <br/> Inventing Productive Socialising <br/> Since 2018 <span className={'dot'}>.</span></h1>
                    </div>
                </div>
            </div>
        );
    }
}