import React from 'react';
import CommandBar from './command-bar.jsx';
import { shallow } from 'enzyme';

describe('renders correctly', () => {
    let _context = null;

    beforeEach(() => { _context = _createContext(); });

    it('inactive task', () => {
        expect(_context.createElement()).toMatchSnapshot();
    });
    it('active task', () => {
        expect(_context.createElement({ isActive: true })).toMatchSnapshot();
    });
});

describe('click handlers', () => {
    let _context = null;

    beforeEach(() => { _context = _createContext(); });

    it('should call `activate` on click on the activation-button', () => {
        const tree = _context.createElement({ isActive: true });
        tree.find('.btn-activation').simulate('click');
        expect(_context.activateTask.mock.calls.length).toEqual(0);
        expect(_context.deactivateTask.mock.calls.length).toEqual(1);
    });
    it('should call `deactivate` on click on the activation-button', () => {
        const tree = _context.createElement({ isActive: false });
        tree.find('.btn-activation').simulate('click');
        expect(_context.activateTask.mock.calls.length).toEqual(1);
        expect(_context.deactivateTask.mock.calls.length).toEqual(0);
    });
});


function _createContext() {
    const activateTask = jest.fn(),
        deactivateTask = jest.fn(),
        toggleNext = jest.fn();
    return {
        createElement: ({ isActive = false } = {}) => _createElement({ activateTask, deactivateTask, toggleNext,
            isActive
        }),
        activateTask,
        deactivateTask
    };
}

function _createElement({ activateTask, deactivateTask, toggleNext, isActive }) {
    return shallow(<CommandBar activateTask={activateTask} deactivateTask={deactivateTask} taskId={1}
        isActive={isActive} tags={['next']} toggleNext={toggleNext} />);
}
