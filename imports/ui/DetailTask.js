import React from 'react';



// having access to the id of the task I am able to retrieve all the info of
// a particular task and then display it

export default class DetailTask extends React.Component {

    showMessage(){
        console.log(this.props.id);
    }

    render() {
        return (
            <div>
                {this.showMessage()}
                <p>Here the detailed task view will be</p>
                <p>This is the task: {this.props.taskName}</p>
            </div>
        );
    }
}