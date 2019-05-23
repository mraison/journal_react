import React from 'react';

class journalEntry extends React.Component {

  state = {
    contacts: []
  };

  componentDidMount = () => {
    this.setState({
      userID: this.props.match.params.userID
    })
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

export default journalEntry;
