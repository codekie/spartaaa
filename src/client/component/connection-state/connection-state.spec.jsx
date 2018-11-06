import React from 'react';
import ConnectionState from './connection-state.jsx';
import { shallow } from 'enzyme';
import TaskStatus from '../../../comm/task-status';

it('renders correctly', () => {
    expect(shallow(<ConnectionState connectionState={TaskStatus.pending} />)).toMatchSnapshot();
});
