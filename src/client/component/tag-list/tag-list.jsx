import React, { PureComponent } from 'react';
import Tag from 'react-bulma-components/lib/components/tag';
import PropTypes from 'prop-types';

export default class TagList extends PureComponent {
    static propTypes = {
        tags: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
    }
    render() {
        const { tags } = this.props;
        return (
            <Tag.Group>{
                tags.map((tag) => (
                    <Tag key={tag}>{ tag }</Tag>
                ))
            }</Tag.Group>
        );
    }
}
