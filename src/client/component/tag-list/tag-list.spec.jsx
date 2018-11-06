import React from 'react';
import TagList from './tag-list.jsx';
import { shallow } from 'enzyme';

it('renders correctly', () => {
    expect(shallow(<TagList tags={['tüdlidü']} />)).toMatchSnapshot();
});
