import React from 'react';
import { shallow } from 'enzyme';
import TaskList from './task-list.jsx';

it('renders correctly', () => {
    expect(shallow(<TaskList filteredTaskUuids={[]} />)).toMatchSnapshot();
});
