import React, { Component } from 'react';
import Task from './task.jsx';
import PropTypes from 'prop-types';

export default class TaskList extends Component {
    static propTypes = {
        tasks: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
    }
    render() {
        const { tasks } = this.props;
        return tasks.map((task) => <Task key={task.uuid} task={task} />);
    }
}
