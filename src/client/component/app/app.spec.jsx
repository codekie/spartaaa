import React from 'react';
import { shallow } from 'enzyme';
import App from './app.jsx';

it('renders correctly', () => {
    expect(shallow(<App />)).toMatchSnapshot();
});
