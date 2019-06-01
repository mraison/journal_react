import React from 'react';
import ReactDOM from 'react-dom';
import BarChart from './components/charts/BarChart'

class userHome extends React.Component {
  constructor(props) {
      super(props);
    }

    componentDidMount() {
      console.log('here here')
      // this.state = {}
      let j = {data: []}
      const url = `http://localhost:8080/users/${this.props.match.params.userID}/points`
      fetch(url, {
          method:'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiAiSFMyNTYifQ==.eyJJRCI6IDMsICJyb2xlIjogInVzZXIifQ==.VDZg7fpSazqx6fNMrmLcJr3pddLmk+WaIJrT7a495kI='
          },
        })
        .then(response => response.json()) // convert reponse to json
        .then(data => {
          console.log(data)
          const d = data.map(j => j.value)
          // So my main data processing will need to go in here. same for the other modules.
          ReactDOM.render(
            <div>
              <BarChart chartData={d} chartID={this.props.match.params.userID}/>
            </div>,
            document.getElementById('searchResults')
          )
        }); // set in state
    }

// So just side note, things passed into components like that are considered props not state.
// you have to set them in state.
  render() {
    return (
      <div id="searchResults"/>
    );
  }
}

export default userHome;
