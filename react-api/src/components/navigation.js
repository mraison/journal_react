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
        <Link to={`/users/${this.props.userID}/newMeasurement`}>Journal Entry </Link>{' '}
        <Link to={`/users/${this.props.userID}/groups`}>Manage Permission Groups</Link>{' '}
        <Link to="/users/logout">Logout</Link>{' '}
      </div>
    );
  }
}

export default Navigation;