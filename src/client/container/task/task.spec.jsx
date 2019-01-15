import React from 'react';
import { shallow } from 'enzyme';
import { ConnectedTask } from './task.jsx';
import TaskFilter from '../../../comm/session/task-filter';

it('renders correctly', () => {
    const taskFilter = new TaskFilter(),
        tree = shallow(<ConnectedTask uuid="ABC" id={1} unfinishTask={jest.fn()} finishTask={jest.fn()}
            taskFilter={taskFilter} handleProjectClick={jest.fn()} handleTagClick={jest.fn()}
            handlePriorityClick={jest.fn()} />
        ).debug();
    expect(tree).toMatchSnapshot();
});
