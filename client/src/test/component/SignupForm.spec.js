import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import SignupForm from '../../components/signup/SignupForm.component';

function setup(saving) {
  const props = {
    document: {},
    saving,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  return shallow(<SignupForm {...props} />);
}

describe('Signup form Test', () => {
  it('renders form and h5', () => {
    const wrapper = setup(false);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('Sign Up');
  });

  it('save button is labeled "Save" ', () => {
    const wrapper = setup(true);
    expect(wrapper.find('button').text()).toEqual('Sign up');
  });

  it('should render self', () => {
    const wrapper = setup();
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('input').length).toEqual(5);
  });

  it('should take props', () => {
    const wrapper = setup();
    expect(wrapper.props().errors).toExist;
    expect(wrapper.props().userProps).toExist;
    expect(wrapper.props().onChange).toExist;
    expect(wrapper.props().onSubmit).toExist;
  });
});
