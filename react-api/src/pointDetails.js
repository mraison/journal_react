import React from 'react';
// point details should just display point information, not actually prompt for any info.
import ReactDOM from 'react-dom';


class pointDetails extends React.Component {
  state = {
    pointID: -1
  };

  constructor(props) {
      super(props);
    }

    componentDidMount() {
      let j = {data: []}
      const url = `http://localhost:8080/users/${this.props.match.params.userID}/points/${this.props.match.params.pointID}`
      fetch(url, {method:'GET'})
        .then(response => response.json()) // convert reponse to json
        .then(data => {
          // So my main data processing will need to go in here. same for the other modules.
          ReactDOM.render(
            <div>
              <div>
                <label> Units:
                    <p>{data.units}</p>
                </label>
              </div>
              <div>
                <label> Value:
                    <p>{data.value}</p>
                </label>
              </div>
              <div>
                <label> Notes:
                    <p>{data.notes}</p>
                </label>
              </div>
              <div>
                <label> Time:
                    <p>{data.time}</p>
                </label>
              </div>
            </div>,
            document.getElementById('pointDetails')
            )
        }); // set in state
    }

  render() {
    return (
      <div id="pointDetails"/>
    );
  }
}

export default pointDetails;
