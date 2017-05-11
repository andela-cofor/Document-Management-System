// import expect from 'expect';
// import users from '../../reducers/users';
// import * as actions from '../../actions/users';
// import * as types from '../../actions/types';

// describe('Admin Reducer', () => {
//   it('should update user when passed USER_UPDATED', () => {
//     // arrange
//     const initialState = [
//       { id: '1', username: 'userA' },
//       { id: '2', username: 'userB' },
//       { id: '3', username: 'userC' }
//     ];

//     const user = { id: '2', username: 'awa' };
//     const action = { type: types.USER_UPDATED, user };

//     // act
//     const newState = users(initialState, action);
//     const updatedUser = newState.find(a => a.id === user.id);
//     const untouchedUser = newState.find(a => a.id === '1');

//     // assert
//     expect(updatedUser.username).toEqual('awa');
//     expect(untouchedUser.username).toEqual('userA');
//     expect(newState.length).toEqual(initialState.length);
//   });

//   it('should add user to state when passed USER_FETCHED', () => {
//     // arrange
//     const initialState = [
//       { id: '1', username: 'userA' },
//       { id: '2', username: 'userB' },
//       { id: '3', username: 'userC' }
//     ];

//     const user = { id: '4', username: 'awa' };
//     const action = { type: types.USER_FETCHED, user };

//     // act
//     const newState = users(initialState, action);

//     expect(newState.length).toEqual(initialState.length + 1);
//   });
//   it('should delete user when passed USER_DELETED', () => {
//     // arrange
//     const initialState = [
//       { id: '1', username: 'userA' },
//       { id: '2', username: 'userB' },
//       { id: '3', username: 'userC' }
//     ];

//     const action = { type: types.USER_DELETED, userId: '2' };
//     // act
//     const newState = users(initialState, action);

//     expect(newState.length).toEqual(initialState.length - 1);
//   });
//   it('should set users when passed SET_USERS', () => {
//     // arrange
//     const initialState = [];
//     const usersToSet = [
//       { id: '1', username: 'A' },
//       { id: '2', username: 'B' },
//       { id: '3', username: 'C' }
//     ];

//     const action = { type: types.SET_USERS, users: usersToSet };
//     // act
//     const newState = users(initialState, action);

//     expect(newState.length).toEqual(usersToSet.length);
//   });
// });
