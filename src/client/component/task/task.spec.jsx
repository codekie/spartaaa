import React from 'react';
import { shallow } from 'enzyme';
import Task from './task.jsx';
import TaskStatus from '../../../comm/task-status';
import TaskFilter from '../../../comm/session/task-filter';

const TIMESTAMP__DUE = 1541687666487;

// Modules have to be mocked in the global context
jest.mock('moment', () => () => ({
    format: () => '2019–01–16 16:10:10',
    fromNow: () => 'Tomorrow'
}));

describe('renders correctly', () => {
    // Local variables
    let _origNow = Date.now,
        _context = null;

    // Setup / teardown
    beforeEach(() => {
        Date.now = jest.fn(() => TIMESTAMP__DUE + 1000);
        _context = _createContext();
    });
    afterEach(() => { Date.now = _origNow; });
    // Specs
    it('default', () => { expect(_context.createElement()).toMatchSnapshot(); });
});

describe('click handlers', () => {
    let _context = null;

    beforeEach(() => { _context = _createContext(); });

    describe('`finishTask`-handler', () => {
        let _elmt = null;

        beforeEach(() => { _elmt = _context.createElement(); });

        it('should call the handler', () => {
            _elmt.find('.btn-check').simulate('click');
            expect(_context.finishTask.mock.calls.length).toBe(1);
            expect(_context.unfinishTask.mock.calls.length).toBe(0);
        });
    });
    describe('`unfinishTask`-handler', () => {
        let _elmt = null;

        beforeEach(() => { _elmt = _context.createElement({ status: TaskStatus.completed }); });

        it('should call the handler', () => {
            _elmt.find('.btn-check').simulate('click');
            expect(_context.finishTask.mock.calls.length).toBe(0);
            expect(_context.unfinishTask.mock.calls.length).toBe(1);
        });
    });
});

// UTILITIES

function _createContext() {
    const finishTask = jest.fn(),
        unfinishTask = jest.fn(),
        handleTagClick = jest.fn(),
        handlePriorityClick = jest.fn(),
        handleProjectClick = jest.fn(),
        taskFilter = new TaskFilter();
    return {
        createElement: ({ status = TaskStatus.pending } = {}) => (
            _createElement({ status, finishTask, unfinishTask, handleTagClick, handleProjectClick, handlePriorityClick,
                taskFilter
            })
        ),
        finishTask,
        unfinishTask
    };
}

function _createElement({ status, finishTask, unfinishTask, handleTagClick, handleProjectClick, handlePriorityClick,
    taskFilter
}) {
    return shallow(<Task finishTask={finishTask} id={1} unfinishTask={unfinishTask} handleTagClick={handleTagClick}
        handleProjectClick={handleProjectClick} uuid="ABC" project="spartaaa" due={TIMESTAMP__DUE} status={status}
        taskFilter={taskFilter} handlePriorityClick={handlePriorityClick} />);
}
