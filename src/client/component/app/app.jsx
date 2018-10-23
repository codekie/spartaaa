import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Section from 'react-bulma-components/lib/components/section';
import ConnectedHeader from '../../container/header';
import Panel from 'react-bulma-components/lib/components/panel';
import { Control, Input } from 'react-bulma-components/lib/components/form';
import TaskListSelector from '../task-list-selector';
import TaskList from '../task-list';
import React from 'react';
import './app.sass';

export default class App extends PureComponent {
    static propTypes = {
        fetchTasks: PropTypes.func.isRequired,
        filteredTaskUuids: PropTypes.array.isRequired,
        setTaskListViewAndUpdateList: PropTypes.func.isRequired,
        tasks: PropTypes.object.isRequired,
        viewName: PropTypes.string
    };

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchTasks();
    }
    // TODO multilanguage
    render() {
        const { viewName, filteredTaskUuids, tasks, setTaskListViewAndUpdateList } = this.props;
        return (
            <Section>
                <ConnectedHeader/>
                <Panel.Block>
                    <Control>
                        {/* TODO remove `readOnly` */}
                        <Input size="small" type="text" placeholder="search" readOnly />
                    </Control>
                </Panel.Block>
                <TaskListSelector viewName={viewName} setTaskListViewAndUpdateList={setTaskListViewAndUpdateList} />
                <TaskList filteredTaskUuids={filteredTaskUuids} tasks={tasks} />
            </Section>
        );
    }
}
