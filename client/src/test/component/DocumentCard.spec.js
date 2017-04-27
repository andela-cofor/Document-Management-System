import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import DocumentCard from '../../components/documents/DocumentCard.component';

function setup() {
  const props = {
    document: { title: '', content: '', access: '' },
    deleteDocument: () => {},
  };

  return mount(<DocumentCard {...props} />);
}

describe('DocumentForm Test', () => {
  it('renders a row div', () => {
    const wrapper = setup();
    expect(wrapper.find('.row')).toExist;
  });

  it('renders card', () => {
    const wrapper = setup();
    expect(wrapper.find('.card')).toExist;
  });

  it('should render self', () => {
    const wrapper = setup();
    expect(wrapper.length).toEqual(1);
    // expect(wrapper.find('Input').length).toEqual(4);
    // console.log(wrapper.find('input').length)
  });

  it('should take props', () => {
    const wrapper = setup();
    expect(wrapper.props().errors).toExist;
    expect(wrapper.props().userProps).toExist;
    expect(wrapper.props().onChange).toExist;
    expect(wrapper.props().onSubmit).toExist;
  });
});
