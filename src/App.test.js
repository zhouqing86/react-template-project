import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import { ThemeProvider } from '@material-ui/core';

describe('App', () => {
  it('renders learn react link', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(ThemeProvider).length).toEqual(1);
  });
});
