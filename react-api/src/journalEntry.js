import React from 'react';
import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'
import Navigation from './components/navigation'

class journalEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      units: undefined,
      value: undefined,
      notes: '',
      tags: null
      // requiredFields: ['units', 'values', 'notes']
    };

    this.handleSubmitAndRedirect = this.handleSubmitAndRedirect.bind(this);
    this.updatePointUnits = this.updatePointUnits.bind(this);
    this.updatePointValue = this.updatePointValue.bind(this);
    this.updatePointTags = this.updatePointTags.bind(this);
    this.updatePointNotes = this.updatePointNotes.bind(this);
  }

  // componentDidMount = () => {
  //   this.setState({
  //     userID: this.props.match.params.userID
  //   })
  // }

  handleSubmitAndRedirect(event) {
    event.preventDefault();
    const tmpState = this.state;
    const url = `http://localhost:8080/users/${this.props.match.params.userID}/points`;
    const bearer_token = cookie.load('bearer_token')
    //prepare data a little more here....

    // Get unix timestamp.
    const time = new Date().getTime()
    tmpState['time'] = time
    const jsonPostData = JSON.stringify(tmpState)

    fetch(url, {
        method: 'POST',
        body: jsonPostData,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearer_token}`
        },
      }).then(response => response.json()) // convert reponse to json
        .then(data => {
          console.log(data)
          const pointID = data['ID']
          this.setState({
            redirectURL: `/users/${this.props.match.params.userID}/points/${pointID}`
          })
        });

  }

  updatePointUnits(event) {
    this.setState({units: event.target.value})
  }
  updatePointValue(event) {
    this.setState({value: event.target.value})
  }
  updatePointNotes(event) {
    this.setState({notes: event.target.value})
  }

  updatePointTags(event) {
    //@TODO add support for multi-entry / multi-select. First pass in comments below.
    this.setState({tags: event.target.value})
    // const tmpTagsState = this.state.tags

    // const targetVal = event.target.value
    // const targetValIndex = tmpTagsState.indexOf(targetVal)
    // if (targetValIndex === -1) {
    //   // element not found so add it.
    //   this._addPointTags(targetVal)
    // } else {
    //   // element found so we'll need to remove it.
    //   this._removePointTags(targetValIndex, tmpTagsState)
    // }
  }

  // _addPointTags(targetVal) {
  //   this.setState(
  //     prevState => ({tags: [...prevState.tags, targetVal]})
  //   )
  // }

  // _removePointTags(targetValIndex, currentTags) {
  //   this.setState({tags: currentTags.splice(targetValIndex, 1)})
  // }

  renderRedirect() {
    if (this.state.redirectURL) {
      return <Redirect to={this.state.redirectURL}/>
    }
  }

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <div className="head-nav">
          <Navigation userID={this.props.match.params.userID}/>
        </div>
        <div className="main-page">
          <form>
            <div>
              <label> Units:
                  <input
                    className="inputfield"
                    type="text"
                    name="units"
                    onChange={this.updatePointUnits}
                  />
              </label>
            </div>
            <div>
              <label> Value:
                  <input
                    className="inputfield" 
                    type="text" 
                    name="value"
                    onChange={this.updatePointValue}
                  />
              </label>
            </div>
            <div>
              <label> Notes:
                  <input
                    className="inputfield"
                    type="text"
                    name="notes"
                    onChange={this.updatePointNotes}
                  />
              </label>
            </div>
            <div>
              <label> Tags:
                  <input 
                    className="inputfield" 
                    type="text" 
                    name="tags"
                    onChange={this.updatePointTags}
                  />
              </label>
            </div>
            <div>
              <label>
                <button
                  onClick={this.handleSubmitAndRedirect}
                >
                  Submit
                </button>
              </label>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default journalEntry;
