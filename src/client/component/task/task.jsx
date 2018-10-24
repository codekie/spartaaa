import React, { PureComponent } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Content from 'react-bulma-components/lib/components/content';
import Icon from 'react-bulma-components/lib/components/icon';
import Level from 'react-bulma-components/lib/components/level';
import Media from 'react-bulma-components/lib/components/media';
import Tag from 'react-bulma-components/lib/components/tag';

import ConnectedTaskTagList from '../../container/task-tag-list';
import './task.sass';
import PropTypes from 'prop-types';

export default class Task extends PureComponent {
    static propTypes = {
        // Raw-data
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
            { uuid, id, description, due, project, urgency, cssClassesString, taskIcon, priority } = props;
        return (
            <Media className={`cmp-task ${ cssClassesString }`}>
                { _createPriorityIndicator(priority) }
                <Media.Item renderAs="figure" position="left">
                    <Icon className="is-medium fa-2x">
                        <FontAwesomeIcon icon={taskIcon} className="task-icon" />
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
                                <Level.Item><ConnectedTaskTagList uuid={uuid} /></Level.Item>
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

function _createPriorityIndicator(priority) {
    return <div className={`priority ${ priority ? `prio-${ priority }` : '' }`} />;
}
