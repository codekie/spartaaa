import React from 'react';
import Omnibox from './omnibox.jsx';
import { shallow } from 'enzyme';

const VAL = '';

it('renders correctly', () => {
    expect(shallow(<Omnibox rawValue={VAL} />)).toMatchSnapshot();
});
