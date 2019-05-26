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

export default pointDetails;
