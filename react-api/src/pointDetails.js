import React from 'react';
// point details should just display point information, not actually prompt for any info.
import ReactDOM from 'react-dom';
import cookie from 'react-cookies'
import Navigation from './components/navigation'


class pointDetails extends React.Component {

  componentDidMount() {
    let j = {data: []}
    const url = `http://localhost:8080/users/${this.props.match.params.userID}/points/${this.props.match.params.pointID}`
    const bearer_token = cookie.load('bearer_token')
    fetch(url, {
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearer_token}`
        },
      })
      .then(response => response.json()) // convert reponse to json
      .then(data => {
        console.log(data)
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
            <div>
              <label> Tags:
                  <p>{data.tags}</p>
              </label>
            </div>
          </div>,
          document.getElementById('pointDetails')
          )
      }); // set in state
  }

  render() {
    return (
      <div>
        <div className="head-nav">
          <Navigation userID={this.props.match.params.userID}/>
        </div>
        <div className="main-page">
          <div id="pointDetails"/>
        </div>
      </div>
    );
  }
}

export default pointDetails;
