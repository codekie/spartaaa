import React, { PureComponent } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Content from 'react-bulma-components/lib/components/content';
import Icon from 'react-bulma-components/lib/components/icon';
import Level from 'react-bulma-components/lib/components/level';
import Media from 'react-bulma-components/lib/components/media';
import Tag from 'react-bulma-components/lib/components/tag';
import { faFolder, faClock, faFlagCheckered, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import CommandBar from './command-bar.jsx';
import ConnectedTaskTagList from '../../container/task-tag-list';
import './task.scss';
import PropTypes from 'prop-types';
import Button from 'react-bulma-components/lib/components/button';
import TaskStatus from '../../../comm/task-status';

const COLOR__TAG__PROJECT_SELECTED = 'primary',
    COLOR__TAG__PROJECT = 'info';

export default class Task extends PureComponent {
    static propTypes = {
        // Functions
        activateTask: PropTypes.func.isRequired,
        deactivateTask: PropTypes.func.isRequired,
        finishTask: PropTypes.func.isRequired,
        handleProjectClick: PropTypes.func.isRequired,
        handlePriorityClick: PropTypes.func.isRequired,
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

    constructor(props) {
        super(props);
    }
    render() {
        const props = this.props,
            {
                uuid, id, description, due, project, urgency, cssClassesString, taskIcon, priority, start, status,
                activateTask, deactivateTask, finishTask, unfinishTask, taskFilter, handleProjectClick, handleTagClick,
                handlePriorityClick
            } = props,
            isCompleted = status === TaskStatus.completed;
        return (
            <Media className={`cmp-task ${ cssClassesString }`}>
                { _createPriorityIndicator(priority, handlePriorityClick) }
                <Media.Item renderAs="figure" position="left">
                    <div>
                        <Icon className="is-medium fa-2x">
                            <FontAwesomeIcon icon={taskIcon} className="task-icon" />
                        </Icon>
                    </div>
                    <div>
                        { _createToggleStatusButton({ id, uuid, isCompleted, unfinishTask, finishTask }) }
                    </div>
                </Media.Item>
                <Media.Item>
                    <Content>
                        <p className="sub-description">
                            <strong className="sub-title"
                            >[{ id || uuid }] { description }</strong>
                        </p>
                        <Level>
                            <Level.Side align="left" className="tags">
                                { _createDueItem(due) }
                                { _createProjectItem(project, taskFilter, handleProjectClick) }
                                <Level.Item><ConnectedTaskTagList uuid={uuid}
                                    handleClick={handleTagClick} taskFilter={taskFilter} /></Level.Item>
                            </Level.Side>
                        </Level>
                        <Level className="aux-bar-1">
                            <Level.Side align="left">
                                <CommandBar taskId={id}
                                    isCompleted={isCompleted}
                                    isActive={!!start}
                                    activateTask={activateTask}
                                    deactivateTask={deactivateTask} />
                            </Level.Side>
                        </Level>
                    </Content>
                    <Level breakpoint="mobile">
                        <Level.Side align="left">
                        </Level.Side>
                    </Level>
                </Media.Item>
                <Media.Item position="right">
                    <Content>
                        <small>{ urgency }</small>
                    </Content>
                </Media.Item>
            </Media>
        );
    }
}

function _createProjectItem(project, taskFilter, clickHandler) {
    if (!project) { return null; }
    const colorTag = project === taskFilter.project ? COLOR__TAG__PROJECT_SELECTED : COLOR__TAG__PROJECT;
    return (
        <Level.Item>
            <Tag.Group gapless className="tag-project tag-icon" onClick={() => clickHandler(project)}>
                <Tag color="dark">
                    <Icon className="is-small">
                        <FontAwesomeIcon icon={faFolder} />
                    </Icon>
                </Tag>
                <Tag color={colorTag}>{ project }</Tag>
            </Tag.Group>
        </Level.Item>
    );
}

function _createDueItem(due) {
    if (!due) { return null; }
    const dueUntil = moment(due).fromNow(),
        classNameDue = due - Date.now() > 0 ? 'in-time' : 'overdue';
    return (
        <Level.Item>
            <Tag.Group gapless className="tag-due tag-icon">
                <Tag color="dark">
                    <Icon className="is-small">
                        <FontAwesomeIcon icon={faClock} />
                    </Icon>
                </Tag>
                <Tag className={classNameDue}>{ dueUntil }</Tag>
            </Tag.Group>
        </Level.Item>
    );
}

function _createPriorityIndicator(priority, handlePriorityClick) {
    return (
        <div className={`priority ${ priority ? `prio-${ priority }` : '' }`}
            onClick={() => handlePriorityClick(priority)} />
    );
}

function _createToggleStatusButton({ id, uuid, isCompleted, unfinishTask, finishTask } = {}) {
    return (
        <Button className="btn-check" onClick={() => {
            return isCompleted
                ? unfinishTask(uuid)
                : finishTask(id);
        }}>
            <Icon>
                <FontAwesomeIcon
                    icon={isCompleted
                        ? faTimesCircle
                        : faFlagCheckered}
                    className="check-icon" />
            </Icon>
        </Button>
    );
}
