import React, { Component } from 'react';
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

export default class Task extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { task } = this.props;
        return (
            <Media className={`cmp-task ${ determineClassNames(task) }`}>
                <Media.Item renderAs="figure" position="left">
                    <Icon className="is-medium fa-2x">
                        <FontAwesomeIcon icon={determineIcon(task)} />
                    </Icon>
                </Media.Item>
                <Media.Item>
                    <Content>
                        <p><strong>[{ task.id }] { task.description }</strong></p>
                        <Level>
                            <Level.Side align="left">
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
            <Tag.Group gapless>
                <Tag color="dark">project</Tag>
                <Tag color="info">{ task.project }</Tag>
            </Tag.Group>
        </Level.Item>
    );
}
