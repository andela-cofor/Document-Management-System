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
