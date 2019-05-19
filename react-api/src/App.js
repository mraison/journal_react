import React from 'react';
import logo from './logo.svg';
import './App.css';
// https://pusher.com/tutorials/consume-restful-api-react
// I'm using the above guide but noticing a few thing different.
// firstly we don't need to include Component thus far to get the following to run fine.
//
// OK i see the issue...I did need to reference the component but I need to be defining a class, not a function...
import Contacts from './components/contacts';


class App extends React.Component {

  state = {
    contacts: []
  };

  componentDidMount = () => {
        fetch('http://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then((data) => {
          this.setState({ contacts: data })
        })
        .catch(console.log)
      };

  render = () => {
    return (
      <Contacts contacts={this.state.contacts}/>
    );
  }
}

export default App;
