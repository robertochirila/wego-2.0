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
            <div className="header-login">
                <div className="row">
                    <div className="col span-2-of-2">
                        <ReactCSSTransitionGroup transitionName="loginAnimation" transitionAppear={true}
                                                 transitionAppearTimeout={2000} transitionEnter={false}
                                                 transitionLeave={false}>
                            <form onSubmit={this.onSubmit.bind(this)} noValidate>
                                <div className="row">
                                    <label>Email</label>
                                </div>
                                <div className="row">
                                    <input type={"email"} ref={"email"} placeholder={"Fill in email"}/>
                                </div>
                                <div className="row">
                                    <label>Password</label>
                                </div>
                                <div className="row">
                                    <input type={"password"} ref={"password"} placeholder={""}/>
                                </div>
                                <div className="row">
                                    <button className="btn signup">Sign Up</button>
                                </div>
                                {this.state.error ? <p>{this.state.error}</p> : undefined}
                            </form>
                        </ReactCSSTransitionGroup>
                    </div>
                    <div className="hero-text-box">
                        <h1>Wego <br/> Inventing Productive Socialising <br/> Since 2018</h1>
                    </div>
                </div>
            </div>
        );
    }
}