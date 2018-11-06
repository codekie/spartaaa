import React from 'react';
import { shallow } from 'enzyme';
import Task from './task.jsx';

it('renders correctly', () => {
    expect(shallow(
        <Task deactivateTask={jest.fn()} activateTask={jest.fn()} finishTask={jest.fn()} id={1}
            unfinishTask={jest.fn()} uuid="ABC" />)
    ).toMatchSnapshot();
});
