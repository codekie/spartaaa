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

        isActive: PropTypes.string,
        taskId: PropTypes.number
    };

    constructor(props) {
        super(props);
    }
    render() {
        const props = this.props,
            { isActive, activateTask, deactivateTask } = props;
        return (
            <Panel className="task-command-bar">
                <Button className="is-grouped" onClick={() => (
                    isActive
                        ? deactivateTask()
                        : activateTask()
                )}>
                    <Icon className="is-small">
                        <FontAwesomeIcon icon={isActive ? faStop : faPlay} className="task-icon" />
                    </Icon>
                </Button>
            </Panel>
        );
    }
}
