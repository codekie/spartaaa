// # IMPORTS

// 3rd-party
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// App
import CommandBar from '../../component/task/command-bar.jsx';
import { extractImmutable } from '../../util';
import { createDispatchMapper } from '../../util/prop-mapper';
import PropTypes from 'prop-types';
import TaskStatus from '../../../comm/task-status';
import ActionType from '../../store/action-type';
import ActionCreator from '../../store/action-creators';

// # CONSTANTS

const MAP__DISPATCH_TO_PROPS = {
    [ActionType.activateTask]: ActionCreator[ActionType.activateTask],
    [ActionType.deactivateTask]: ActionCreator[ActionType.deactivateTask],
    [ActionType.finishTask]: ActionCreator[ActionType.finishTask],
    [ActionType.toggleNext]: ActionCreator[ActionType.toggleNext]
};


// # EXPORT PUBLIC API

export class ConnectedCommandBar extends PureComponent {
    static propTypes = {
        uuid: PropTypes.string.isRequired,

        activateTask: PropTypes.func.isRequired,
        deactivateTask: PropTypes.func.isRequired,
        toggleNext: PropTypes.func.isRequired,

        taskId: PropTypes.number,
        status: PropTypes.string,
        start: PropTypes.number,
        tags: PropTypes.array.isRequired
    };

    render() {
        const { taskId, tags, start, activateTask, deactivateTask, toggleNext, status } = this.props,
            isCompleted = status === TaskStatus.completed;
        return (<CommandBar taskId={taskId}
            isCompleted={isCompleted}
            isActive={!!start}
            activateTask={activateTask}
            deactivateTask={deactivateTask}
            tags={tags}
            toggleNext={toggleNext} />);
    }
}

export default connect(
    _mapStateToProps,
    createDispatchMapper(MAP__DISPATCH_TO_PROPS)
)(extractImmutable(ConnectedCommandBar));


function _mapStateToProps(state, ownProps) {
    const task = state.get('tasks').get('tasks').get(ownProps.uuid);
    return {
        taskId: task.get('id'),
        status: task.get('status'),
        start: task.get('start'),
        tags: task.get('tags').toJS()
    };
}
