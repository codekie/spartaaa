import React from 'react';
import Omnibox from './omnibox.jsx';
import { shallow } from 'enzyme';

const VAL = '';

it('renders correctly', () => {
    const parsedValues = {
        project: 'foo',
        tags: ['bar']
    };
    expect(shallow(<Omnibox rawValue={VAL} parsedValues={parsedValues} />)).toMatchSnapshot();
});
