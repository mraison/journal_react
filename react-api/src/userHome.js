import React from 'react';
// This isn't actually the right form. the home page should be a menu to navigate over some user options.

class userHome extends React.Component {

  state = {
    data: {units: 'ft', value: 5, notes: 'test dummy data', time: 123456789}
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
              <p>{this.state.data.units}</p>
          </label>
        </div>
        <div>
          <label> Value:
              <p>{this.state.data.value}</p>
          </label>
        </div>
        <div>
          <label> Notes:
              <p>{this.state.data.notes}</p>
          </label>
        </div>
        <div>
          <label> Time:
              <p>{this.state.data.time}</p>
          </label>
        </div>
      </div>
    );
  }
}

export default userHome;
