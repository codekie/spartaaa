import React, { PureComponent } from 'react';
import Task from './task.jsx';
import PropTypes from 'prop-types';

export default class TaskList extends PureComponent {
    static propTypes = {
        filteredTaskUuids: PropTypes.array.isRequired,
        tasks: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }
    render() {
        const { filteredTaskUuids, tasks } = this.props;
        return filteredTaskUuids.map((uuid) => <Task key={uuid} {...tasks[uuid]} />);
    }
}
