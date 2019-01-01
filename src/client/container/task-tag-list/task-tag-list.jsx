// # IMPORTS

// 3rd-party
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// App
import TagList from '../../component/tag-list';
import { extractImmutable } from '../../util';
import { createDispatchMapper } from '../../util/prop-mapper';
import PropTypes from 'prop-types';

// # CONSTANTS

const MAP__DISPATCH_TO_PROPS = {};


// # EXPORT PUBLIC API

export class ConnectedTaskTagList extends PureComponent {
    static propTypes = {
        uuid: PropTypes.string.isRequired,
        tags: PropTypes.array.isRequired,
        handleClick: PropTypes.func.isRequired,
        taskFilter: PropTypes.object.isRequired
    };

    render() {
        const { tags, handleClick, taskFilter } = this.props;
        return <TagList tags={tags} handleClick={handleClick} taskFilter={taskFilter} />;
    }
}

export default connect(
    _mapStateToProps,
    createDispatchMapper(MAP__DISPATCH_TO_PROPS)
)(extractImmutable(ConnectedTaskTagList));


function _mapStateToProps(state, ownProps) {
    return {
        tags: state.get('tasks').get('tasks').get(ownProps.uuid).get('tags').toJS()
    };
}
