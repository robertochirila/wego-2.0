import React from 'react';
import {Link} from 'react-router-dom';

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
            <div className="login-background">
                <div className="login-form">
                    <div className="wrapper-login">
                        <form onSubmit={this.onSubmit.bind(this)} noValidate>
                            <div className="field">
                                <label>Email</label>
                                <input className="validation" type={"email"} ref={"email"}
                                       placeholder={"Fill in email"}/>
                            </div>
                            <div className="field">
                                <label>Password</label>
                                <input className="validation" type={"password"} ref={"password"} placeholder={""}/>
                            </div>
                            <div className="wrapper-centered">
                                <button className="button-login">Login</button>
                            </div>
                            <Link to="/signup">Don't have an account?</Link>
                            {this.state.error ? <p>{this.state.error}</p> : undefined}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
