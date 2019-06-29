import React from 'react';
import ReactDOM from 'react-dom';
import BarChart from '../../charts/BarChart'
import cookie from 'react-cookies'
import Navigation from '../../navigation'
// import SearchBar from '../../charts/searchBar'

class recordSetPage extends React.Component {
  constructor(props) {
      super(props);
    }

    componentDidMount() {
      const url = `http://localhost:8080/users/${this.props.match.params.userID}/recordSets/${this.props.match.params.recordSetID}/measurements`
      const bearer_token = cookie.load('bearer_token')
      fetch(url, {
          method:'GET',
          headers: { // Right now this issues a hard fail if the request is not authorized.
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${bearer_token}`
          },
        })
        .then(response => {console.log(response); return response.json()}) // convert reponse to json
        .then(data => {
          // So my main data processing will need to go in here. same for the other modules.
          ReactDOM.render(
            <div>
              <BarChart chartData={data} chartID={this.props.match.params.userID}/>
            </div>,
            document.getElementById('searchResults')
          )
        }); // set in state
    }

// So just side note, things passed into components like that are considered props not state.
// you have to set them in state.
  render() {
    return (
      <div>
        <div className="head-nav">
          <Navigation userID={this.props.match.params.userID}/>
        </div>
        <div className="main-page">
          <div id="searchResults"/>
        </div>
      </div>
    );
  }
}

export default recordSetPage;
