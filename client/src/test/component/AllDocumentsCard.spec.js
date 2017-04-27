import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import AllDocumentsCard from '../../components/documents/AllDocumentsCard.component';

function setup() {
  const props = {
    document: { title: '', content: '', access: '' },
    deleteDocument: () => {},
  };

  return mount(<AllDocumentsCard {...props} />);
}

describe('AllDocumentForm Test', () => {
  it('renders a row div', () => {
    const wrapper = setup();
    expect(wrapper.find('.row')).toExist;
  });

  it('renders card', () => {
    const wrapper = setup();
    expect(wrapper.find('.card')).toExist;
    expect(wrapper.find('.card-content')).toExist;
    expect(wrapper.find('.card-reveal')).toExist;
  });

  it('should render self', () => {
    const wrapper = setup();
    expect(wrapper.length).toEqual(1);
  });

  it('should take props', () => {
    const wrapper = setup();
    expect(wrapper.props().errors).toExist;
    expect(wrapper.props().userProps).toExist;
    expect(wrapper.props().onChange).toExist;
    expect(wrapper.props().onSubmit).toExist;
  });
});
