import React from 'react';
import { shallow } from 'enzyme';
import { TaskTagListContainer } from './task-tag-list.jsx';

it('renders correctly', () => {
    const tree = shallow(<TaskTagListContainer tags={[]} uuid="Manfred" />).debug();
    expect(tree).toMatchSnapshot();
});
