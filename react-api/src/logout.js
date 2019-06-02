import React from 'react';
import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'

class journalEntry extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogoutAndRedirect = this.handleLogoutAndRedirect.bind(this);
  }

  handleLogoutAndRedirect() {
    // @TODO make my own cookie jar to manage my app specific cookies so that I don't have to worry about other pages overwriting my cookies or listing out all my cookies.
    cookie.remove('bearer_token', {'path': '/'})
    cookie.remove('userID', {'path': '/'})
    return <Redirect to="/users/login"/>
  }

  render() {
    return (
      <div>
        {this.handleLogoutAndRedirect()}
      </div>
    );
  }
}

export default journalEntry;
