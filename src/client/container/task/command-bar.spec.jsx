import React from 'react';
import { shallow } from 'enzyme';
import { ConnectedCommandBar } from './command-bar.jsx';

it('renders correctly', () => {
    const tree = shallow(<ConnectedCommandBar uuid="Manfred" activateTask={jest.fn()} deactivateTask={jest.fn()}
        toggleNext={jest.fn()} tags={[]}
    />).debug();
    expect(tree).toMatchSnapshot();
});
