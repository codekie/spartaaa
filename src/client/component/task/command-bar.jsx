import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Panel from 'react-bulma-components/lib/components/panel';
import Button from 'react-bulma-components/lib/components/button';
import Icon from 'react-bulma-components/lib/components/icon';
import { faPlay, faStop, faStepForward, faStepBackward } from '@fortawesome/free-solid-svg-icons';

import './command-bar.scss';
import PropTypes from 'prop-types';

const TAG__NEXT = 'next';

export default class Task extends PureComponent {
    static propTypes = {
        activateTask: PropTypes.func.isRequired,
        deactivateTask: PropTypes.func.isRequired,
        toggleNext: PropTypes.func.isRequired,

        isActive: PropTypes.bool,
        isCompleted: PropTypes.bool,
        taskId: PropTypes.number,
        tags: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
    }
    render() {
        const props = this.props,
            { isActive, isCompleted, activateTask, deactivateTask, taskId, tags, toggleNext } = props;
        return (
            <Panel className="task-command-bar">
                { _createStartStopButton({ taskId, isCompleted, isActive, deactivateTask, activateTask }) }
                { _createToggleNextButton({ taskId, isCompleted, tags, toggleNext }) }
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

function _createToggleNextButton({ taskId, isCompleted, tags, toggleNext } = {}) {
    if (isCompleted) { return null; }
    const hasNext = tags.includes(TAG__NEXT);
    return (
        <Button className="is-grouped btn-toggle-next" onClick={() => toggleNext(taskId)}>
            <Icon className="is-small">
                <FontAwesomeIcon icon={hasNext ? faStepBackward : faStepForward} className="task-icon" />
            </Icon>
        </Button>
    );
}
