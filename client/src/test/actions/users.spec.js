import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';
import * as actions from '../../actions/users';
import userSignupRequest from '../../actions/users';
import * as auth from '../../actions/authActions';
import * as types from '../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates SET_USERS and SET_PAGINATION when fetching users has been done',
    () => {
      nock('http://localhost.com/')
        .get('/users')
        .reply(200, {
          body: {
            pagination: {
              totalCount: 1,
              pageSize: 2,
              currentPage: 1,
              pageCount: 6 },
            rows: [{
              username: 'chinex',
              firstName: 'Chinedu',
              lastName: 'Ofor',
              email: 'c@mail.com',
              password: 'netbeans' }]
          } });

      const expectedActions = [{ type: types.SET_USERS,
        users: [{ username: '', firstName: '', lastName: '', email: '', password: '' }] },

      { type: types.SET_PAGINATION,
        pagination: {
          totalCount: 1,
          pageSize: 2,
          currentPage: 1,
          pageCount: 6 }
      }];

      // const store = mockStore({ auth: {}, users: [],
      // users: [], search: [], paginate: {}, user: [] });
      const store = mockStore({ users: [], paginate: {} });

      store.dispatch(actions.fetchUsers())
        .then((res) => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
//   it('creates ADD_USER when sign up has been done',
//     () => {
//       const user = {
//         username: 'chinex',
//         firstName: 'Chinedu',
//         lastName: 'Ofor',
//         email: 'c@mail.com',
//         password: 'netbeans' };
//       nock('http://localhost.com/')
//         .post('/users', user)
//         .reply(200, {
//           body: { user } });

//       const expectedActions = [{ type: types.ADD_USER, user }];

//       // const store = mockStore({ auth: {}, users: [],
//       // users: [], search: [], paginate: {}, user: [] });
//       const store = mockStore({ users: [] });

//       store.dispatch(userSignupRequest(user))
//         .then((res) => {
//           expect(store.getActions()).toEqual(expectedActions);
//         });
//     });
  it('creates SET_CURRENT_USER when login has been done',
    () => {
      const user = { username: 'awa', password: 'awa' };
      nock('http://localhost.com/')
        .post('/users/login', user)
        .reply(200, {
          body: { token: 'fdsffsfsdfsd', user: { userId: 2, roleId: 2 } } });

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
