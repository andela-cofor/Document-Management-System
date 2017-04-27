import React from 'react';
import { mount , shallow } from 'enzyme';
import expect from 'expect';
import index from '../../components/homepage/index.component';
import NavBar from '../../components/navigation/Nav.component';
import FlashMessagesList from '../../components/flash/FlashMessagesList';

describe(' Test for index Component', () => {
  it('renders without crashing', () => {
    shallow(<index />);
  });

  it('renders children when passed in', () => {
    const wrapper = shallow(
      <index>
        <NavBar />
      </index>
    );
    expect(wrapper.contains(<NavBar />)).toEqual(true);
  });

  it('renders children when passed in', () => {
    const wrapper = shallow(
      <index>
        <FlashMessagesList />
      </index>
    );
    expect(wrapper.contains(<FlashMessagesList />)).toEqual(true);
  });
});
