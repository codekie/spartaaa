import React, { Component } from 'react';
import Task from './task.jsx';
import PropTypes from 'prop-types';

export default class TaskList extends Component {
    static propTypes = {
        tasks: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }
    render() {
        const immTasks = this.props.tasks;
        return immTasks.map((immTask) => <Task key={immTask.get('uuid')} task={immTask} />);
    }
}
