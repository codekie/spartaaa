// # IMPORTS

// 3rd-party
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// App
import Task from '../../component/task';
import { extractImmutable } from '../../util';
import { createDispatchMapper } from '../../util/prop-mapper';
import determineClassNames from './css-class-determinator';
import determineIcon from './icon-determinator';
import ActionType from '../../store/action-type';
import ActionCreator from '../../store/action-creators';

// # CONSTANTS

const MAP__DISPATCH_TO_PROPS = {
    [ActionType.activateTask]: ActionCreator[ActionType.activateTask],
    [ActionType.deactivateTask]: ActionCreator[ActionType.deactivateTask],
    [ActionType.finishTask]: ActionCreator[ActionType.finishTask],
    handleProjectClick: ActionCreator[ActionType.toggleProjectFilter],
    handlePriorityClick: ActionCreator[ActionType.togglePriorityFilter],
    handleTagClick: ActionCreator[ActionType.toggleTagFilter],
    [ActionType.unfinishTask]: ActionCreator[ActionType.unfinishTask]
};


// # EXPORT PUBLIC API

export class ConnectedTask extends PureComponent {
    static propTypes = {
        // Functions
        activateTask: PropTypes.func.isRequired,
        deactivateTask: PropTypes.func.isRequired,
        finishTask: PropTypes.func.isRequired,
        handleProjectClick: PropTypes.func.isRequired,
        handleTagClick: PropTypes.func.isRequired,
        unfinishTask: PropTypes.func.isRequired,

        // Raw-data
        taskFilter: PropTypes.object.isRequired,
        description: PropTypes.string,
        due: PropTypes.number,
        id: PropTypes.number.isRequired,
        priority: PropTypes.string,
        project: PropTypes.string,
        start: PropTypes.number,
        status: PropTypes.string,
        urgency: PropTypes.number,
        uuid: PropTypes.string.isRequired,
        // Pre-processed data
        cssClassesString: PropTypes.string,
        iconTask: PropTypes.object
    };

    render() {
        return <Task {...this.props} />;
    }
}

export default connect(
    _mapStateToProps,
    createDispatchMapper(MAP__DISPATCH_TO_PROPS)
)(extractImmutable(ConnectedTask));


function _mapStateToProps(state, ownProps) {
    const task = state.get('tasks').get('tasks').get(ownProps.uuid).toJS(),
        taskFilter = state.get('session').get('taskFilter').toJS(),
        cssClassesString = determineClassNames(task),
        taskIcon = determineIcon(task);
    // Don't pass the `tags` property, since this will cause the component always to re-render, since the tags-array
    // always will be replaces with a new instance (and that even though it's not  even relevant to the
    // `Task`-component)
    delete task.tags;
    return {
        ...task,
        taskFilter,
        cssClassesString,
        taskIcon
    };
}
