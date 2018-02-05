import React from 'react';
import DisplayUserProfile from './DisplayUserProfile';


export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //console.log('User Profile Mounted')
    }

    renderProfile() {

        if (this.props.user.length === 0) {
            return (
                <div>
                    <p>User Not Found !</p>
                </div>
            )
        } else {
            console.log(this.props.user);
            return this.props.user.map(function (userProfile) {
                return <DisplayUserProfile key={userProfile._id} userProfile={userProfile}/>
            });
        }


    }

    render() {
        return (
            <div>
                {this.renderProfile()}
            </div>
        );
    }
}