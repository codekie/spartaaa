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

export class TaskTagListContainer extends PureComponent {
    static propTypes = {
        uuid: PropTypes.string.isRequired,
        tags: PropTypes.array
    };

    render() {
        const tags = this.props.tags;
        return <TagList tags={tags} />;
    }
}

export default connect(
    _mapStateToProps,
    createDispatchMapper(MAP__DISPATCH_TO_PROPS)
)(extractImmutable(TaskTagListContainer));


function _mapStateToProps(state, ownProps) {
    return {
        tags: state.get('tasks').get('tasks').get(ownProps.uuid).get('tags').toJS()
    };
}
