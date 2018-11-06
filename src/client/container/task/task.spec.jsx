import React from 'react';
import { shallow } from 'enzyme';
import { TaskContainer } from './task.jsx';

it('renders correctly', () => {
    const tree = shallow(<TaskContainer uuid="ABC" id={1} unfinishTask={jest.fn()} finishTask={jest.fn()}
        activateTask={jest.fn()} deactivateTask={jest.fn()} />
    ).debug();
    expect(tree).toMatchSnapshot();
});
