import React, { Component } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Content from 'react-bulma-components/lib/components/content';
import Icon from 'react-bulma-components/lib/components/icon';
import Level from 'react-bulma-components/lib/components/level';
import Media from 'react-bulma-components/lib/components/media';
import Tag from 'react-bulma-components/lib/components/tag';

import TagList from '../tag-list';
import determineClassNames from './css-class-determinator';
import determineIcon from './icon-determinator';
import './task.sass';
import PropTypes from 'prop-types';

export default class Task extends Component {
    static propTypes = {
        task: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }
    render() {
        const immTask = this.props.task;
        return (
            <Media className={`cmp-task ${ determineClassNames(immTask) }`}>
                { _createPriorityIndicator(immTask) }
                <Media.Item renderAs="figure" position="left">
                    <Icon className="is-medium fa-2x">
                        <FontAwesomeIcon icon={determineIcon(immTask)} className="task-icon" />
                    </Icon>
                </Media.Item>
                <Media.Item>
                    <Content>
                        <p className="sub-description">
                            <strong className="sub-title"
                            >[{ immTask.get('id') }] { immTask.get('description') }</strong>
                        </p>
                        <Level className="aux-bar-1">
                            <Level.Side align="left">
                            </Level.Side>
                        </Level>
                        <Level>
                            <Level.Side align="left" className="tags">
                                { _createDueItem(immTask) }
                                { _createProjectItem(immTask) }
                                <Level.Item><TagList tags={immTask.get('tags')} /></Level.Item>
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
                        <small>{ immTask.get('urgency') }</small>
                    </Content>
                </Media.Item>
            </Media>
        );
    }
}

function _createProjectItem(task) {
    const project = task.get('project');
    if (!project) { return null; }
    return (
        <Level.Item>
            <Tag.Group gapless className="tag-project">
                <Tag color="dark">project</Tag>
                <Tag color="info">{ project }</Tag>
            </Tag.Group>
        </Level.Item>
    );
}

function _createDueItem(task) {
    const due = task.get('due');
    if (!due) { return null; }
    const dueUntil = moment(due).fromNow(),
        classNameDue = due - Date.now() > 0 ? 'in-time' : 'overdue';
    return (
        <Level.Item>
            <Tag.Group gapless className="tag-due">
                <Tag color="dark">due</Tag>
                <Tag className={classNameDue}>{ dueUntil }</Tag>
            </Tag.Group>
        </Level.Item>
    );
}

function _createPriorityIndicator(task) {
    const priority = task.get('priority');
    return <div className={`priority ${ priority ? `prio-${ priority }` : '' }`} />;
}
