import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
// import DocumentCreateForm from '../../components/documents/DocumentCreateForm.component';
import DocumentCreateForm from '../../../components/documents/DocumentCreateForm.component';

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
    <DocumentCreateForm {...props} />,
  );
}

describe('DocumentPage Test', () => {
  describe('DocumentForm Test', () => {
    it('renders form and h5', () => {
      const wrapper = setup(false);
      expect(wrapper.find('form').length).toBe(1);
      expect(wrapper.find('h5').text()).toEqual('Create a Document');
    });

    it('save button is labeled "Save" ', () => {
      const wrapper = setup(true);
      expect(wrapper.find('button').text()).toEqual('Save');
    });

    it('should render self', () => {
      const wrapper = setup();
      expect(wrapper.length).toEqual(1);
      expect(wrapper.find('Input').length).toEqual(3);
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
