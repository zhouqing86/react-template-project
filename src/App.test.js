import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { shallow } from 'enzyme';

describe('App', () => {
  it('renders learn react link', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('renders learn react link', () => {
    const wrapper = shallow(<App />);
    console.log(wrapper.text());
    expect(wrapper.text()).toEqual(expect.stringContaining('Learn React'));
  });
});
