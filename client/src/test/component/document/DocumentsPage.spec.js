import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import AllDocumentsCard from '../../../components/documents/AllDocumentsCard.component';

const store = configureMockStore()({});

function setup(saving) {
  const props = {
    document: { title: '', content: '', access: '' },
    saving,
    errors: {},
    onSave: () => {},
    onChange: () => {},
    store,
    deleteDocument: () => {},
  };

  return mount(
    <AllDocumentsCard {...props} />
  );
}

describe('DocumentPage Test', () => {
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
    });

    it('should take props', () => {
      const wrapper = setup();
      expect(wrapper.props().errors).toExist;
      expect(wrapper.props().userProps).toExist;
      expect(wrapper.props().onChange).toExist;
      expect(wrapper.props().onSubmit).toExist;
    });
  });
});
