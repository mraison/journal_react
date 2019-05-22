import React from 'react';
// https://pusher.com/tutorials/consume-restful-api-react
// I'm using the above guide but noticing a few thing different.
// firstly we don't need to include Component thus far to get the following to run fine.
//
// OK i see the issue...I did need to reference the component but I need to be defining a class, not a function...
// import Contacts from './components/contacts';
import RequestGET from './utilities/request_handler';
// import JournalEntryForm from './components/journal_entry_form';

class userHome extends React.Component {

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
      <div>
        <div>
          <label> Units:
              <input className="inputfield" type="text" name="units"/>
          </label>
        </div>
        <div>
          <label> Value:
              <input className="inputfield" type="text" name="value"/>
          </label>
        </div>
        <div>
          <label> Notes:
              <input className="inputfield" type="text" name="notes"/>
          </label>
        </div>
      </div>
    );
  }
}

export default userHome;
