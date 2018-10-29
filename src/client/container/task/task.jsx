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
    [ActionType.unfinishTask]: ActionCreator[ActionType.unfinishTask]
};


// # EXPORT PUBLIC API

class TaskContainer extends PureComponent {
    static propTypes = {
        uuid: PropTypes.string.isRequired
    };

    render() {
        return <Task {...this.props} />;
    }
}

export default connect(
    _mapStateToProps,
    createDispatchMapper(MAP__DISPATCH_TO_PROPS)
)(extractImmutable(TaskContainer));


function _mapStateToProps(state, ownProps) {
    const task = state.get('tasks').get('tasks').get(ownProps.uuid).toJS(),
        cssClassesString = determineClassNames(task),
        taskIcon = determineIcon(task);
    // Don't pass the `tags` property, since this will cause the component always to re-render, since the tags-array
    // always will be replaces with a new instance (and that even though it's not  even relevant to the
    // `Task`-component)
    delete task.tags;
    return {
        ...task,
        cssClassesString,
        taskIcon
    };
}
