import { connect } from 'react-redux';
import React from 'react';
import { fetchUsers, deleteUser } from '../../actions/users';
import UsersList from './UsersList';
import Search from '../common/Search'
import { searchUsers } from '../../actions/searchAction';

class UsersPage extends React.Component {
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers()
  }

  handleSearch(event) {
    event.preventDefault();
    const query = event.target.value;
    if (query === '') {
      window.location = '/app/users';
    } else {
      this.props.searchUsers(query);
    }
  }
  

  render() {
    const usersSearchResult = this.props.search;
    const renderedUsers = usersSearchResult.length > 0
      ? usersSearchResult : this.props.users;
    
    return (
      <div>
        <div className="col s7 push-s8">
          <Search onChange={this.handleSearch.bind(this)} />
        </div>
        <UsersList
          users={renderedUsers}
          deleteUser={this.props.deleteUser}
        />
      </div>
    );
  }
}

UsersPage.propTypes = {
  users: React.PropTypes.array.isRequired,
  fetchUsers: React.PropTypes.func.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
  search: React.PropTypes.array.isRequired,
  searchUsers: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    users: state.users,
    search: state.search
  };
}

export default connect(mapStateToProps, { fetchUsers, deleteUser, searchUsers })(UsersPage);
