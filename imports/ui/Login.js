import React from 'react';
import {Link} from 'react-router-dom';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: ""
        }
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
            <div className="container">
                <form onSubmit={this.onSubmit.bind(this)} noValidate>
                    <label>Email</label>
                    <input className="validation" type={"email"} ref={"email"} placeholder={"Fill in email"}/>
                    <label>Password</label>
                    <input className="validation" type={"password"} ref={"password"} placeholder={""}/>
                    <button>Login</button>
                    <Link to="/signup">Don't have an account?</Link>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                </form>
            </div>
        );
    }
}
