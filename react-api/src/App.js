import React from 'react';
import logo from './logo.svg';
import './App.css';
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
import userHome from './userHome';
import recordSearch from './recordSearch'
import journalEntry from './journalEntry'
import pointDetails from './pointDetails'

class App extends React.Component {

  state = {
    contacts: []
  };

  componentDidMount() {
  }

  render() {
    return (
      <Router>
        <Route path="/users/:userID/home" component={userHome}/>
        <Route path="/users/:userID/recordSearch" component={recordSearch}/>
        <Route path="/users/:userID/entry" component={journalEntry}/>
        <Route path="/users/:userID/points/:pointID" component={pointDetails}/>
      </Router>
    );
  }
}

export default App;
