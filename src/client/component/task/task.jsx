import React, { PureComponent } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Content from 'react-bulma-components/lib/components/content';
import Icon from 'react-bulma-components/lib/components/icon';
import Level from 'react-bulma-components/lib/components/level';
import Media from 'react-bulma-components/lib/components/media';
import Tag from 'react-bulma-components/lib/components/tag';
import { faFolder, faClock, faFlagCheckered, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { ConnectedCommandBar } from '../../container/task';
import ConnectedTaskTagList from '../../container/task-tag-list';
import './task.scss';
import PropTypes from 'prop-types';
import Button from 'react-bulma-components/lib/components/button';
import TaskStatus from '../../../comm/task-status';

const COLOR__TAG__PROJECT_SELECTED = 'primary',
    COLOR__TAG__PROJECT = 'info',
    INTERVAL__DUE_TIME = 60000,
    FORMAT__DATE = 'LLLL';

export default class Task extends PureComponent {
    static propTypes = {
        // Functions
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
        status: PropTypes.string,
        urgency: PropTypes.number,
        uuid: PropTypes.string.isRequired,
        // Pre-processed data
        cssClassesString: PropTypes.string,
        iconTask: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            timeoutDueUntil: null
        };
    }

    componentWillReceiveProps(nextProps) {
        clearTimeout(this.state.timeoutDueUntil);
        nextProps.due && this.setState({
            timeoutDueUntil: this._createDueUntilTimeout()
        });
    }

    _createDueUntilTimeout() {
        return setTimeout(
            () => {
                this.setState({
                    timeoutDueUntil: this._createDueUntilTimeout()
                });
            }, INTERVAL__DUE_TIME
        );
    }
    _createProjectItem(project, taskFilter, clickHandler) {
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
    _createDueItem(due) {
        if (!due) { return null; }
        const momentDue = moment(due),
            dueUntil = momentDue.fromNow(),
            classNameDue = due - Date.now() > 0 ? 'in-time' : 'overdue';
        return (
            <Level.Item>
                <Tag.Group gapless className="tag-due tag-icon" title={momentDue.format(FORMAT__DATE)}>
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
    _createPriorityIndicator(priority, handlePriorityClick) {
        return (
            <div className={`priority ${ priority ? `prio-${ priority }` : '' }`}
                onClick={() => handlePriorityClick(priority)} />
        );
    }
    _createToggleStatusButton({ id, uuid, isCompleted, unfinishTask, finishTask } = {}) {
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

    render() {
        const props = this.props,
            {
                uuid, id, description, due, project, urgency, cssClassesString, taskIcon, priority, status,
                finishTask, unfinishTask, taskFilter, handleProjectClick, handleTagClick, handlePriorityClick
            } = props,
            isCompleted = status === TaskStatus.completed;
        return (
            <Media className={`cmp-task ${ cssClassesString }`}>
                { this._createPriorityIndicator(priority, handlePriorityClick) }
                <Media.Item renderAs="figure" position="left">
                    <div>
                        <Icon className="is-medium fa-2x">
                            <FontAwesomeIcon icon={taskIcon} className="task-icon" />
                        </Icon>
                    </div>
                    <div>
                        { this._createToggleStatusButton({ id, uuid, isCompleted, unfinishTask, finishTask }) }
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
                                { this._createDueItem(due) }
                                { this._createProjectItem(project, taskFilter, handleProjectClick) }
                                <Level.Item><ConnectedTaskTagList uuid={uuid}
                                    handleClick={handleTagClick} taskFilter={taskFilter} /></Level.Item>
                            </Level.Side>
                        </Level>
                        <Level className="aux-bar-1">
                            <Level.Side align="left">
                                <ConnectedCommandBar uuid={uuid} />
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

