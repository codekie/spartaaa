import React, { PureComponent } from 'react';
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

export default class Task extends PureComponent {
    static propTypes = {
        description: PropTypes.string,
        due: PropTypes.number,
        id: PropTypes.number.isRequired,
        priority: PropTypes.string,
        project: PropTypes.string,
        start: PropTypes.number,
        status: PropTypes.string,
        tags: PropTypes.array.isRequired,
        urgency: PropTypes.number,
        uuid: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
    }
    render() {
        const props = this.props,
            { id, description, due, tags, project, urgency } = props;
        return (
            <Media className={`cmp-task ${ determineClassNames(props) }`}>
                { _createPriorityIndicator(props) }
                <Media.Item renderAs="figure" position="left">
                    <Icon className="is-medium fa-2x">
                        <FontAwesomeIcon icon={determineIcon(props)} className="task-icon" />
                    </Icon>
                </Media.Item>
                <Media.Item>
                    <Content>
                        <p className="sub-description">
                            <strong className="sub-title"
                            >[{ id }] { description }</strong>
                        </p>
                        <Level className="aux-bar-1">
                            <Level.Side align="left">
                            </Level.Side>
                        </Level>
                        <Level>
                            <Level.Side align="left" className="tags">
                                { _createDueItem(due) }
                                { _createProjectItem(project) }
                                <Level.Item><TagList tags={tags} /></Level.Item>
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

function _createProjectItem(project) {
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

function _createDueItem(due) {
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
    const { priority } = task;
    return <div className={`priority ${ priority ? `prio-${ priority }` : '' }`} />;
}
