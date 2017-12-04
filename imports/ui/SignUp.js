import React from 'react';


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
            <div>
                <form onSubmit={this.onSubmit.bind(this)} noValidate>
                    <input type={"email"} ref={"email"} placeholder={"Fill in email"}/>
                    <input type={"password"} ref={"password"} placeholder={""}/>
                    <button>Sign Up</button>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                </form>
            </div>
        );
    }
}