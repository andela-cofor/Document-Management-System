import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';
import * as actions from '../../actions/documentActions';
import * as types from '../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Document Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates SET_DOCUMENTS and SET_PAGINATION when fetching documents has been done',
  () => {
    nock('http://localhost.com/')
      .get('/documents')
      .reply(200, {
        body: { pagination:
        {
          totalCount: 1,
          pageSize: 2,
          currentPage: 1,
          pageCount: 6 },
          rows: [{ title: '', content: '', access: '', owner: {} }] } });

    const expectedActions = [{ type: types.SET_DOCUMENTS,
      documents: [{ title: '', content: '', access: '', owner: {} }] },

    { type: types.SET_PAGINATION,
      pagination: {
        totalCount: 1,
        pageSize: 2,
        currentPage: 1,
        pageCount: 6 } }];

    // const store = mockStore({ auth: {}, documents: [],
    // users: [], search: [], paginate: {}, user: [] });
    const store = mockStore({ documents: [], paginate: {} });

    store.dispatch(actions.fetchDocuments())
      .then((res) => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates ADD_DOCUMENT when saving document has been done',
  () => {
    const document = { title: 'title', content: 'content', access: 'public' };
    nock('http://localhost.com/')
      .post('/documents', document)
      .reply(200, {
        body: { document: { title: 'title', content: 'content', access: 'public' } } });

    const expectedActions = [{ type: types.ADD_DOCUMENT,
      document: { title: 'title', content: 'content', access: 'public' } }];

    // const store = mockStore({ auth: {}, documents: [],
    // users: [], search: [], paginate: {}, user: [] });
    const store = mockStore({ documents: [] });

    store.dispatch(actions.saveDocument())
      .then((res) => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
