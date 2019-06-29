import React from 'react';
import { Link } from 'react-router-dom'

class Navigation extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    // <Link to={`/users/${this.props.userID}/points`}>Points Page</Link>{' '} remove this for now...
    return (
      <div>
        <Link to={`/users/${this.props.userID}/recordSets`}>Record Sets</Link>{' '}
        <Link to={`/users/${this.props.userID}/entry`}>Journal Entry </Link>{' '}
        <Link to="/users/logout">Logout</Link>{' '}
        <Link to={`/users/${this.props.userID}/groups`}>Manage Permission Groups</Link>{' '}
      </div>
    );
  }
}

export default Navigation;