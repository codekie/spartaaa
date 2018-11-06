import React from 'react';
import TaskListSelector from './task-list-selector.jsx';
import { shallow } from 'enzyme';
import * as TaskListView from '../../../comm/task-list-views';

describe('renders correctly', () => {
    Object.keys(TaskListView)
        .map(key => TaskListView[key])
        .forEach((viewName) => {
            describe(`\`${ viewName }\`-task-list-selector`, () => {
                let _elmt = null,
                    _context = null;

                // eslint-disable-next-line max-nested-callbacks
                beforeEach(() => {
                    _context = _createContext();
                    _elmt = _context.createElement({ viewName });
                });

                // eslint-disable-next-line max-nested-callbacks
                it('should render the element', () => expect(_elmt).toMatchSnapshot());
                // eslint-disable-next-line max-nested-callbacks
                it('should call the click-handler with the correct value', () => {
                    _elmt.find(`.view-tab-${ viewName }`).simulate('click');
                    expect(_context.setTaskListViewAndUpdateList.mock.calls.length).toBe(1);
                });
            });
        });
});

function _createContext() {
    const setTaskListViewAndUpdateList = jest.fn();
    return {
        createElement: ({ viewName }) => shallow(<TaskListSelector
            setTaskListViewAndUpdateList={setTaskListViewAndUpdateList} viewName={viewName} />),
        setTaskListViewAndUpdateList
    };
}
