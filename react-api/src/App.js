import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'
import history from './history';
// https://pusher.com/tutorials/consume-restful-api-react
// I'm using the above guide but noticing a few thing different.
// firstly we don't need to include Component thus far to get the following to run fine.
//
// OK i see the issue...I did need to reference the component but I need to be defining a class, not a function...
// import Contacts from './components/contacts';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import recordSearch from './recordSearch'
import journalEntry from './journalEntry'
import pointDetails from './pointDetails'
import LoginSignUpPage from './loginSignUpPage'
import logout from './logout'
import GroupManagement from './groupManagement'
import recordSets from './recordSets'
import recordSetPage from './components/recordSets/recordSet/recordSetPage'

class App extends React.Component {
  constructor(props) {
    super(props);


    this.renderRedirect = this.renderRedirect.bind(this);
  }

  renderRedirect(history) { // This routing probably belongs in the individual components tbh...within the catch statements maybe...
    const bearer_token = cookie.load('bearer_token')
    const current_url = history.location.pathname
    if (current_url === '/users/login') {
      // if we're already on the login page then do nothing
      // One thing we may want to do here is to redirect people to their entries if they're already logged in.
      if (typeof bearer_token !== 'undefined') {
        // if bearer token is set we don't need to do anything so allow forwarding to the relavent react component.
        const userID = cookie.load('userID')
        return <Redirect to={`/users/${userID}/recordSets`}/>
      }

      return
    }

    if (typeof bearer_token !== 'undefined') {
      // if bearer token is set we don't need to do anything so allow forwarding to the relavent react component.
      return
    }

    
    return <Redirect to='/users/login'/>
  }

  render() { // it kind of looks like the children are rendering before we do our logic to redirect the request. I think we need to manage the redirect before mounting.
    return (
      <div>
        <Router>
          <Route path="/users/login" component={LoginSignUpPage}/>
          
          <Route render={({history}) => (
            this.renderRedirect(history)
          )} />
          <Route exact path="/users/:userID/recordSets/:recordSetID/measurements/:measurementID" component={pointDetails}/>
          <Route exact path="/users/:userID/recordSets/:recordSetID/measurements" component={recordSetPage}/>
          <Route exact path="/users/:userID/recordSets" component={recordSets}/>
          <Route path="/users/:userID/newMeasurement" component={journalEntry}/>
          <Route path="/users/logout" component={logout}/>

          <Route path="/users/:userID/groups" component={GroupManagement}/>
        </Router>
      </div>
    );
  }
}

export default App;
