import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Panel from 'react-bulma-components/lib/components/panel';
import * as TaskListView from '../../../comm/task-list-views';
import ActionType from '../../store/action-type';
import Action from '../../store/actions';
import { getTaskListView } from '../../store/state/accessor/session';

// CONSTANTS

const MAP__DISPATCH_TO_PROPS = {
    [ActionType.setTaskListViewAndUpdateList]: Action[ActionType.setTaskListViewAndUpdateList]
};


class TagList extends Component {
    static propTypes = {
        setTaskListViewAndUpdateList: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }
    render() {
        const viewName = getTaskListView(),
            { setTaskListViewAndUpdateList } = this.props;
        return (
            <Panel.Tabs className="panel-tabs">
                <Panel.Tabs.Tab
                    active={TaskListView.pending === viewName}
                    onClick={() => setTaskListViewAndUpdateList(TaskListView.pending)}>Pending</Panel.Tabs.Tab>
                <Panel.Tabs.Tab
                    active={TaskListView.next === viewName}
                    onClick={() => setTaskListViewAndUpdateList(TaskListView.next)}>Next</Panel.Tabs.Tab>
                <Panel.Tabs.Tab
                    active={TaskListView.postponed === viewName}
                    onClick={() => setTaskListViewAndUpdateList(TaskListView.postponed)}>Postponed</Panel.Tabs.Tab>
                <Panel.Tabs.Tab
                    active={TaskListView.completed === viewName}
                    onClick={() => setTaskListViewAndUpdateList(TaskListView.completed)}>Completed</Panel.Tabs.Tab>
                <Panel.Tabs.Tab
                    active={TaskListView.all === viewName}
                    onClick={() => setTaskListViewAndUpdateList(TaskListView.all)}>All</Panel.Tabs.Tab>
            </Panel.Tabs>
        );
    }
}
export default connect(
    _mapStateToProps,
    _mapDispatchToProps
)(TagList);


// IMPLEMENTATION DETAILS

function _mapStateToProps(state) {
    return { ...state };
}

function _mapDispatchToProps(dispatch) {
    return bindActionCreators({ ...MAP__DISPATCH_TO_PROPS }, dispatch);
}
