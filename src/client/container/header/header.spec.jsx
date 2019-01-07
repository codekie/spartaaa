import React from 'react';
import { shallow } from 'enzyme';
import ConnectedHeader from './header';

it('should render correctly', () => {
    expect(shallow(<ConnectedHeader />).debug()).toMatchSnapshot();
});
