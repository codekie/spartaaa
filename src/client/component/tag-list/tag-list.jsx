import React, { Component } from 'react';
import Tag from 'react-bulma-components/lib/components/tag';

export default class TagList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { tags = [] } = this.props;
        return (
            <Tag.Group>{
                tags.map((tag) => (
                    <Tag key={tag}>{ tag }</Tag>
                ))
            }</Tag.Group>
        );
    }
}
