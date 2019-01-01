import React from 'react';
import { shallow } from 'enzyme';
import { ConnectedTaskTagList } from './task-tag-list.jsx';
import TaskFilter from '../../../comm/session/task-filter';

it('renders correctly', () => {
    const taskFilter = new TaskFilter(),
        tree = shallow(
            <ConnectedTaskTagList tags={[]} uuid="Manfred" handleClick={jest.fn()} taskFilter={taskFilter} />
        ).debug();
    expect(tree).toMatchSnapshot();
});
