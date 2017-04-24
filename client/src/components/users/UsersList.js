import React from 'react';
import UsersCard from './UsersCard.component';

export default function UsersList({ users, deleteUser }) {
  const emptyMessage = (
    <p>There are no Users in the Database.</p>
  );

  const usersList = (
    <div className="row">
      {users.map(users =>
        <UsersCard
          users={users} key={users.id} deleteUser={deleteUser}
        />)}
    </div>
  );

  return (
    <div>
      {users.length === 0 ? emptyMessage : usersList}
    </div>
  );
}

UsersList.propTypes = {
  users: React.PropTypes.array.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
};
