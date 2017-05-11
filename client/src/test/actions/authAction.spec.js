import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';
import * as auth from '../../actions/authActions';
import * as types from '../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Login Action', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it('creates SET_CURRENT_USER when login has been done',
    () => {
      const user = { username: 'chinedu', password: 'netbeans' };
      nock('http://localhost.com/')
        .post('/users/login', user)
        .reply(200, {
          body: { token: 'tokenization', user: { userId: 2, roleId: 2 } } });

      const expectedActions = [{ type: types.SET_CURRENT_USER,
        user }];

      // const store = mockStore({ auth: {}, users: [],
      // users: [], search: [], paginate: {}, user: [] });
      const store = mockStore({ auth: {} });

      store.dispatch(auth.userLoginRequest(user))
        .then((res) => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
});