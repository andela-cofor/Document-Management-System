// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import expect from 'expect';
// import nock from 'nock';
// import userSignupRequest from '../../actions/signupActions';
// import * as types from '../../actions/types';

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

// describe('User Actions', () => {
//   afterEach(() => {
//     nock.cleanAll();
//   });
//   it('creates ADD_USER when sign up has been done',
//     () => {
//       const user = {
//         username: 'chinex',
//         firstName: 'chinedu',
//         lastName: 'ofor',
//         email: 'c@mail.com',
//         password: 'netbeans' };
//       nock('http://localhost.com/')
//         .post('/users', user)
//         .reply(200, {
//           body: { user } });

//       const expectedActions = [{ type: types.SET_USERS,
//         user }];

//       // const store = mockStore({ auth: {}, users: [],
//       // users: [], search: [], paginate: {}, user: [] });
//       const store = mockStore({ users: [] });

//       store.dispatch(userSignupRequest(user))
//         .then((res) => {
//           expect(store.getActions()).toEqual(expectedActions);
//         });
//     });
// });