import expect from 'expect';
import documents from '../../reducers/document';
import * as actions from '../../actions/documentActions';
import * as types from '../../actions/types';

describe('Document Reducer', () => {
  it('should add document when passed ADD_DOCUMENT', () => {
    // arrange
    const initialState = [
      { title: 'A' },
      { title: 'B' }
    ];

    const newDocument = { title: 'C' };

    const action = { type: types.ADD_DOCUMENT, document: newDocument };

    // act
    const newState = documents(initialState, action);

    // assert
    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual('A');
    expect(newState[1].title).toEqual('B');
    expect(newState[2].title).toEqual('C');
  });

  it('should update document when passed DOCUMENT_UPDATED', () => {
    // arrange
    const initialState = [
      { id: '1', title: 'A' },
      { id: '2', title: 'B' },
      { id: '3', title: 'C' }
    ];

    const document = { id: '2', title: 'New Title' };
    const action = { type: types.DOCUMENT_UPDATED, document };

    // act
    const newState = documents(initialState, action);
    const updatedDocument = newState.find(a => a.id === document.id);
    const untouchedDocument = newState.find(a => a.id === '1');

    // assert
    expect(updatedDocument.title).toEqual('New Title');
    expect(untouchedDocument.title).toEqual('A');
    expect(newState.length).toEqual(initialState.length);
  });

  it('should return document when passed DOCUMENT_FETCHED', () => {
    // arrange
    const initialState = [
      { id: '1', title: 'A' },
      { id: '2', title: 'B' },
      { id: '3', title: 'C' }
    ];

    const document = { id: '4', title: 'Document Fetched' };
    const action = { type: types.DOCUMENT_FETCHED, document };

    // act
    const newState = documents(initialState, action);

    expect(newState.length).toEqual(initialState.length + 1);
  });
  it('should delete document when passed DOCUMENT_DELETED', () => {
    // arrange
    const initialState = [
      { id: '1', title: 'A' },
      { id: '2', title: 'B' },
      { id: '3', title: 'C' }
    ];

    const action = { type: types.DOCUMENT_DELETED, documentId: '2' };
    // act
    const newState = documents(initialState, action);

    expect(newState.length).toEqual(initialState.length - 1);
  });
  it('should set documents when passed SET_DOCUMENTS', () => {
    // arrange
    const initialState = [];
    const documentsToSet = [
      { id: '1', title: 'A' },
      { id: '2', title: 'B' },
      { id: '3', title: 'C' }
    ];

    const action = { type: types.SET_DOCUMENTS, documents: documentsToSet };
    // act
    const newState = documents(initialState, action);

    expect(newState.length).toEqual(documentsToSet.length);
  });
});
