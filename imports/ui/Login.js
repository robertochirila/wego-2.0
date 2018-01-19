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
            <div className='container'>
                <div className='row'>
                    <div className='box'>
                        <h3>Login Form</h3>
                        <form onSubmit={this.onSubmit.bind(this)}>
                            <div className="row">
                                <label>Email</label>
                            </div>
                            <div className="row">
                                <input type={"email"} ref={"email"} placeholder={"Email Address"}/>
                            </div>
                            <div className="row">
                                <label>Password</label>
                            </div>
                            <div className='row'>
                                <input type={"password"} ref={"password"} placeholder={"Password"}/>
                            </div>
                            <div className='row'>
                                <button className="btn login">Login</button>
                            </div>
                            <div className='row'>
                                <a className="btn signup"><Link to="/signup">Sign Up</Link></a>
                                {this.state.error ? <p>{this.state.error}</p> : undefined}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
