import React from 'react';
import { shallow } from 'enzyme';
import { TaskContainer } from './task.jsx';
import TaskFilter from '../../../comm/session/task-filter';

it('renders correctly', () => {
    const taskFilter = new TaskFilter(),
        tree = shallow(<TaskContainer uuid="ABC" id={1} unfinishTask={jest.fn()} finishTask={jest.fn()}
            activateTask={jest.fn()} deactivateTask={jest.fn()} taskFilter={taskFilter} handleProjectClick={jest.fn()}
            handleTagClick={jest.fn()} />
        ).debug();
    expect(tree).toMatchSnapshot();
});
