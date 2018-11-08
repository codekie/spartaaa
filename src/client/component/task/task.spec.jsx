import React from 'react';
import { shallow } from 'enzyme';
import Task from './task.jsx';

const TIMESTAMP__DUE = 1541687666487;

it('renders correctly', () => {
    let _origNow = Date.now;

    beforeEach(() => {
        Date.now = jest.fn(() => TIMESTAMP__DUE + 1000);
    });
    afterEach(() => {
        Date.now = _origNow;
    });

    expect(shallow(
        <Task deactivateTask={jest.fn()} activateTask={jest.fn()} finishTask={jest.fn()} id={1}
            unfinishTask={jest.fn()} uuid="ABC" project="spartaaa" due={TIMESTAMP__DUE} />)
    ).toMatchSnapshot();
});
