import React, { PureComponent } from 'react';
import Tag from 'react-bulma-components/lib/components/tag';
import PropTypes from 'prop-types';
import './tag-list.scss';

const COLOR__TAG__DEFAULT = null,
    COLOR__TAG__SELECTED = 'primary';

export default class TagList extends PureComponent {
    static propTypes = {
        tags: PropTypes.array.isRequired,
        handleClick: PropTypes.func.isRequired,
        taskFilter: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }
    render() {
        const { tags, handleClick, taskFilter } = this.props;
        return (
            <Tag.Group className="cmp-tag-list">{
                tags.map((tag) => (
                    <Tag key={tag} onClick={() => handleClick(tag)}
                        color={taskFilter.tags.includes(tag) ? COLOR__TAG__SELECTED : COLOR__TAG__DEFAULT}
                    >{ tag }</Tag>
                ))
            }</Tag.Group>
        );
    }
}
