import { List } from 'immutable';
import React, { Component } from 'react';
import Tag from 'react-bulma-components/lib/components/tag';
import PropTypes from 'prop-types';

export default class TagList extends Component {
    static propTypes = {
        tags: PropTypes.object
    };

    constructor(props) {
        super(props);
    }
    render() {
        const imTags = this.props.tags || List();
        return (
            <Tag.Group>{
                imTags.map((tag) => (
                    <Tag key={tag}>{ tag }</Tag>
                ))
            }</Tag.Group>
        );
    }
}
