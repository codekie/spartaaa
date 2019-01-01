import React from 'react';
import { shallow } from 'enzyme';
import ConnectedTaskList from './task-list';

it('should render correctly', () => {
    expect(shallow(<ConnectedTaskList />).debug).toMatchSnapshot();
});
