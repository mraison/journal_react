import React from 'react';
import logo from './logo.svg';
import './App.css';
// https://pusher.com/tutorials/consume-restful-api-react
// I'm using the above guide but noticing a few thing different.
// firstly we don't need to include Component thus far to get the following to run fine.
//
// OK i see the issue...I did need to reference the component but I need to be defining a class, not a function...
// import Contacts from './components/contacts';
import RequestGET from './utilities/request_handler';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import userHome from './userHome';

class App extends React.Component {

  state = {
    contacts: []
  };

  componentDidMount = () => {
    // let res
    // try {
    //   res = RequestGET('http://jsonplaceholder.typicode.com/users')
    // }
    // catch(e) {
    //   res = []
    // }
    // console.log(res)
    // this.setState({ contacts: res })
  }

  render() {
    return (
      <Router>
        <div>
          <Link to="/users/1/home">user 1</Link>
        </div>

        <Route path="/users/:userID/home" component={userHome}/>
      </Router>
    );
  }
}

export default App;
