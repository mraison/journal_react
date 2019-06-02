import React from 'react';
import { Link } from 'react-router-dom'

class Navigation extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <Link to={`/users/${this.props.userID}/points`}>Points Page</Link>{' '}
        <Link to={`/users/${this.props.userID}/entry`}>Journal Entry </Link>{' '}
        <Link to="/users/logout">Logout</Link>{' '}
      </div>
    );
  }
}

export default Navigation;