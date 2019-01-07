import React from 'react';
import { shallow } from 'enzyme';
import ConnectedOmnibox from './omnibox';

it('should render correctly', () => {
    expect(shallow(<ConnectedOmnibox />).debug()).toMatchSnapshot();
});
