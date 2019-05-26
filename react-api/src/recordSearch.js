import React from 'react';
import BarChart from './components/charts/BarChart'

class userHome extends React.Component {
  constructor(props) {
      super(props);

      // this.state = {}
      let j = {data: []}
      const url = `http://localhost:8080/users/${this.props.match.params.userID}/points`
      fetch(url, {method:'GET'})
        .then(response => response.json()) // convert reponse to json
        .then(data => {
          const r = data.map(d => d.valueReal)
          console.log(r)
          j = {
            data: r,
            userID: this.props.match.params.userID
          }
        }); // set in state
        console.log('constructor->')
        console.log(j)
        this.state = j
    }

  // componentDidMount = () => {
  //   const url = `http://localhost:8080/users/${this.props.match.params.userID}/points`
  //   fetch(url, {method:'GET'})
  //     .then(response => response.json()) // convert reponse to json
  //     .then(data => {
  //       const r = data.map(d => d.valueReal)
  //       console.log(r)
  //       this.setState({
  //         data: r,
  //         userID: this.props.match.params.userID
  //       })
  //     }); // set in state

  // }

// So just side note, things passed into components like that are considered props not state.
// you have to set them in state.
  render() {
    return (
      <div>
        <BarChart chartData={this.state.data} chartID={this.state.userID}/>
      </div>
    );
  }
}

export default userHome;
