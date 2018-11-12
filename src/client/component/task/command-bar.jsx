import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Panel from 'react-bulma-components/lib/components/panel';
import Button from 'react-bulma-components/lib/components/button';
import Icon from 'react-bulma-components/lib/components/icon';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

import './command-bar.sass';
import PropTypes from 'prop-types';

export default class Task extends PureComponent {
    static propTypes = {
        activateTask: PropTypes.func.isRequired,
        deactivateTask: PropTypes.func.isRequired,

        isActive: PropTypes.bool,
        isCompleted: PropTypes.bool,
        taskId: PropTypes.number
    };

    constructor(props) {
        super(props);
    }
    render() {
        const props = this.props,
            { isActive, isCompleted, activateTask, deactivateTask, taskId } = props;
        return (
            <Panel className="task-command-bar">
                { _createStartStopButton({ taskId, isCompleted, isActive, deactivateTask, activateTask }) }
            </Panel>
        );
    }
}

function _createStartStopButton({ taskId, isCompleted, isActive, deactivateTask, activateTask } = {}) {
    if (isCompleted) { return null; }
    return (
        <Button className="is-grouped btn-activation" onClick={() => (
            isActive
                ? deactivateTask(taskId)
                : activateTask(taskId)
        )}>
            <Icon className="is-small">
                <FontAwesomeIcon icon={isActive ? faStop : faPlay} className="task-icon" />
            </Icon>
        </Button>
    );
}
