import React, { PureComponent } from 'react';
import ConnectedTask from '../../container/task';
import PropTypes from 'prop-types';

export default class TaskList extends PureComponent {
    static propTypes = {
        filteredTaskUuids: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
    }
    render() {
        const { filteredTaskUuids } = this.props;
        return filteredTaskUuids.map((uuid) => <ConnectedTask key={uuid} uuid={uuid} />);
    }
}
