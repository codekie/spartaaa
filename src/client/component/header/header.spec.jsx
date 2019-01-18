import React from 'react';
import Header from './header.jsx';
import { shallow } from 'enzyme';
import TaskStatus from '../../../comm/task-status';

it('renders correctly', () => {
    expect(shallow(<Header connectionState={TaskStatus.pending} loading={false} refreshTasks={jest.fn()} />))
        .toMatchSnapshot();
});
