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
        const { task } = this.props;
        return (
            <Media className={`cmp-task ${ determineClassNames(task) }`}>
                { _createPriorityIndicator(task) }
                <Media.Item renderAs="figure" position="left">
                    <Icon className="is-medium fa-2x">
                        <FontAwesomeIcon icon={determineIcon(task)} className="task-icon" />
                    </Icon>
                </Media.Item>
                <Media.Item>
                    <Content>
                        <p className="sub-description">
                            <strong className="sub-title">[{ task.id }] { task.description }</strong>
                        </p>
                        <Level className="aux-bar-1">
                            <Level.Side align="left">
                            </Level.Side>
                        </Level>
                        <Level>
                            <Level.Side align="left" className="tags">
                                { _createDueItem(task) }
                                { _createProjectItem(task) }
                                <Level.Item><TagList tags={task.tags} /></Level.Item>
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
                        <small>{ task.urgency }</small>
                    </Content>
                </Media.Item>
            </Media>
        );
    }
}

function _createProjectItem(task) {
    if (!task.project) { return null; }
    return (
        <Level.Item>
            <Tag.Group gapless className="tag-project">
                <Tag color="dark">project</Tag>
                <Tag color="info">{ task.project }</Tag>
            </Tag.Group>
        </Level.Item>
    );
}

function _createDueItem(task) {
    if (!task.due) { return null; }
    const dueUntil = moment(task.due).fromNow(),
        classNameDue = task.due - Date.now() > 0 ? 'in-time' : 'overdue';
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
    return <div className={`priority ${ task.priority ? `prio-${ task.priority }` : '' }`} />;
}
