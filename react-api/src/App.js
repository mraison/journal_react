import React from 'react';
import logo from './logo.svg';
import './App.css';
// https://pusher.com/tutorials/consume-restful-api-react
// I'm using the above guide but noticing a few thing different.
// firstly we don't need to include Component thus far to get the following to run fine.
//
// OK i see the issue...I did need to reference the component but I need to be defining a class, not a function...
import Contacts from './components/contacts';
import RequestGET from './utilities/request_handler';
import JournalEntryForm from './components/journal_entry_form';

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

  render = () => {
    return (
      <JournalEntryForm Rows={[
        {FieldName:'TestName1', FieldValue:'TestValue1'},
        {FieldName:'TestName2', FieldValue:'TestValue2'},
        {FieldName:'TestName3', FieldValue:'TestValue3'}
        ]}/>
    );
  }
}

export default App;
