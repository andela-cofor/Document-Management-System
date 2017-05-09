import { connect } from 'react-redux';
import React from 'react';
import { Pagination } from 'react-materialize';
import { fetchUsers, deleteUser } from '../../actions/users';
import UsersList from './UsersList';
import Search from '../common/Search';
import { searchUsers } from '../../actions/searchAction';
import paginateUserAction from '../../actions/paginateUsersAction';

/**
 * @class UsersPage
 * @extends {React.Component}
 */
class UsersPage extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
      limit: 9,
      offset: 0
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  /**
   * @memberof UsersPage
   * @returns {props} props from redux
   */
  componentDidMount() {
    // this.props.fetchUsers();
    this.props.paginateUserAction(this.state.offset, this.state.limit);
  }


  /**
   * @param {any} event
   * @memberof UsersPage
   * @returns {object} search from server
   */
  handleSearch(event) {
    event.preventDefault();
    const query = event.target.value;
    if (query === '') {
      window.location = '/app/users';
    } else {
      this.props.searchUsers(query);
    }
  }


  /**
   * @returns {object} object of users
   * @memberof UsersPage
   */
  render() {
    const usersSearchResult = this.props.search;
    const renderedUsers = usersSearchResult.length > 0
      ? usersSearchResult : this.props.users;
    
    return (
      <div>
        <div className="row">
          <div className="col s7 push-s8">
            <Search onChange={this.handleSearch.bind(this)} />
          </div>
          <div className="col s5 pull-s7">
          </div>
        </div>
        <UsersList
          users={renderedUsers}
          deleteUser={this.props.deleteUser}
        />
        <div>
          <center>
            <Pagination
              className="pag"
              items={this.props.pageCount}
              onSelect={(page) => {
                const offset = (page - 1) * 9;
                this.props.paginateUserAction(offset, this.state.limit);
              }}
            />
          </center>
        </div>
      </div>
    );
  }
}

UsersPage.propTypes = {
  users: React.PropTypes.array.isRequired,
  pageCount: React.PropTypes.number.isRequired,
  fetchUsers: React.PropTypes.func.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
  search: React.PropTypes.array.isRequired,
  searchUsers: React.PropTypes.func.isRequired,
  paginateUserAction: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    users: state.pagination.items,
    pageCount: state.pagination.pageCount,
    search: state.search
  };
}

export default connect(mapStateToProps, { fetchUsers, deleteUser, searchUsers, paginateUserAction })(UsersPage);
