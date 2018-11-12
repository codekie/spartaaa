import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Panel from 'react-bulma-components/lib/components/panel';
import * as TaskListView from '../../../comm/task-list-views';

// CONSTANTS

export default class TagList extends Component {
    static propTypes = {
        setTaskListViewAndUpdateList: PropTypes.func.isRequired,

        viewName: PropTypes.string
    };

    constructor(props) {
        super(props);
    }
    render() {
        const { viewName, setTaskListViewAndUpdateList } = this.props;
        return (
            <Panel.Tabs className="panel-tabs">
                <Panel.Tabs.Tab
                    className={`view-tab-${ TaskListView.pending }`}
                    active={TaskListView.pending === viewName}
                    onClick={() => setTaskListViewAndUpdateList(TaskListView.pending)}>Pending</Panel.Tabs.Tab>
                <Panel.Tabs.Tab
                    className={`view-tab-${ TaskListView.next }`}
                    active={TaskListView.next === viewName}
                    onClick={() => setTaskListViewAndUpdateList(TaskListView.next)}>Next</Panel.Tabs.Tab>
                <Panel.Tabs.Tab
                    className={`view-tab-${ TaskListView.postponed }`}
                    active={TaskListView.postponed === viewName}
                    onClick={() => setTaskListViewAndUpdateList(TaskListView.postponed)}>Postponed</Panel.Tabs.Tab>
                <Panel.Tabs.Tab
                    className={`view-tab-${ TaskListView.completed }`}
                    active={TaskListView.completed === viewName}
                    onClick={() => setTaskListViewAndUpdateList(TaskListView.completed)}>Completed</Panel.Tabs.Tab>
                <Panel.Tabs.Tab
                    className={`view-tab-${ TaskListView.all }`}
                    active={TaskListView.all === viewName}
                    onClick={() => setTaskListViewAndUpdateList(TaskListView.all)}>All</Panel.Tabs.Tab>
            </Panel.Tabs>
        );
    }
}
