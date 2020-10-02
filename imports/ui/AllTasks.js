import React from 'react';


export default class AllTasks extends React.Component {

    render() {
        return (
            <option>
                {this.props.task.name}
            </option>
        );
    }
}