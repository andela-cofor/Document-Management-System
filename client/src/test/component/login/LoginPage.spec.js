import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import LoginForm from '../../../components/login/LoginForm.component';

const store = configureMockStore()({});

/**
 * @param {any} saving
 * @returns {object} test
 */
function setup(saving) {
  const props = {
    document: {},
    saving,
    errors: {},
    onSave: () => {},
    onChange: () => {},
    store
  };

  return mount(<LoginForm {...props} />);
}

describe('ProfilePage Test', () => {
  it('renders form and h5', () => {
    const wrapper = setup(false);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('Login');
  });

  it('Login button is labeled "Login" ', () => {
    const wrapper = setup(true);
    expect(wrapper.find('button').text()).toEqual('Login');
  });

  it('should render self', () => {
    const wrapper = setup();
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('input').length).toEqual(2);
  });

  it('should take props', () => {
    const wrapper = setup();
    expect(wrapper.props().errors).toExist;
    expect(wrapper.props().userProps).toExist;
    expect(wrapper.props().onChange).toExist;
    expect(wrapper.props().onSubmit).toExist;
  });
});
