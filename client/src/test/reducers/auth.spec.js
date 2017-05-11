import expect from 'expect';
import users from '../../reducers/auth';
import * as actions from '../../actions/authActions';

describe('Auth Reducer', () => {
  it('should set user when passed SET_CURRENT_USER', () => {
    // arrange
    const initialState = {
      isAuthenticated: false,
      user: {},
    };

    const user = { UserId: '1', RoleId: '2' };

    const action = actions.setCurrentUser(user);
    // act
    const newState = users(initialState, action);

    expect(newState.isAuthenticated).toEqual(true);
    expect(newState.user).toEqual(user);
  });

  it('should set clear when passed SET_CURRENT_USER with empty object', () => {
    // arrange
    const initialState = {
      isAuthenticated: false,
      user: {},
    };

    const user = {};

    const action = actions.setCurrentUser(user);
    // act
    const newState = users(initialState, action);

    expect(newState.isAuthenticated).toEqual(false);
    expect(newState.user).toEqual(user);
  });
});

// /*
// global expect:true
// global thunk:true
// global configureMockStore:true
// global moxios:true
// global sinon:true
// */
// import moxios from 'moxios'
// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk'
// import login from '../../actions/authActions';

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

// describe('async actions', () => {
//  beforeEach(() => {
//   moxios.install();
//  });

//  afterEach(() => {
//   moxios.uninstall();
//  });

//  it('creates LOGIN_USER and CLEAR_ERROR action when user has been validated',
//  (done) => {
//   const expectedActions = [
//    { type: 'LOGIN_USER', payload: { token: 'abc' } },
//    { type: 'CLEAR_ERROR' },
//   ];

//   const store = mockStore({ auth: { loggedInUser: null, isAuthenticated: false } });

//   store.dispatch(login({
//    email: 'c@gmail.com',
//    password: 'password'
//   })).then(() => {
//    expect(store.getActions()).to.eql(expectedActions);
//    done();
//   });

//   moxios.wait(() => {
//    const request = moxios.requests.mostRecent();
//    request.respondWith({
//     status: 200,
//     response: { token: 'abc' }
//    });
//   });
//  });

//  it('creates VALIDATION_ERROR action when user details are incorrect',
//  (done) => {
//   const expectedActions = [
//    { type: 'VALIDATION_ERROR', payload: 'email/passwords do not match' }
//   ];

//   const store = mockStore({ auth: { loggedInUser: null, isAuthenticated: false } });

//   store.dispatch(login({
//    email: 'wromgemail@gmail.com',
//    password: 'password'
//   })).then(() => {
//    expect(store.getActions()).to.eql(expectedActions);
//    done();
//   });

//   moxios.wait(() => {
//    const request = moxios.requests.mostRecent();
//    request.respondWith({
//     status: 401,
//     response: { message: 'email/passwords do not match' }
//    });
//   });
//  });
// });

