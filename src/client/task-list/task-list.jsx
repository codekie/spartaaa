import React, { Component } from 'react';
import Task from './task.jsx';

export default class TaskList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { tasks } = this.props;
        return tasks.map((task) => <Task key={task.uuid} task={task} />);
    }
}
