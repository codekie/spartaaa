import React from 'react';
import { shallow } from 'enzyme';
import ConnectedTaskListSelector from './task-list-selector';

it('should render correctly', () => {
    expect(shallow(<ConnectedTaskListSelector />).debug()).toMatchSnapshot();
});
