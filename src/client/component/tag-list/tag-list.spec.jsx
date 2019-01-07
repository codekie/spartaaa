import React from 'react';
import TagList from './tag-list.jsx';
import { shallow } from 'enzyme';
import TaskFilter from '../../../comm/session/task-filter';

it('renders correctly', () => {
    const taskFilter = new TaskFilter();
    expect(shallow(<TagList tags={['tüdlidü']} handleClick={jest.fn()} taskFilter={taskFilter} />)).toMatchSnapshot();
});
