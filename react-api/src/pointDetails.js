import React from 'react';
// point details should just display point information, not actually prompt for any info.


class pointDetails extends React.Component {

  state = {
    pointID: -1
  };

  componentDidMount = () => {
    this.setState({
      pointID: this.props.match.params.pointID,
      userID: this.props.match.params.userID
    })
  }

  render() {
    return (
      <div>
      <h3>User ID: {this.state.userID}</h3>
      <h3>Point ID: {this.state.pointID}</h3>
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

export default pointDetails;
