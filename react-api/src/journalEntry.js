import React from 'react';
import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'
import Navigation from './components/navigation'
import {Dropdown} from 'primereact/dropdown'

class journalEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      units: undefined,
      value: undefined,
      notes: '',
      recordSetID: undefined,
      users_record_sets: []
    };

    this.handleSubmitAndRedirect = this.handleSubmitAndRedirect.bind(this);
    this.updatePointUnits = this.updatePointUnits.bind(this);
    this.updatePointValue = this.updatePointValue.bind(this);
    this.updatePointRecordSetID = this.updatePointRecordSetID.bind(this);
    this.updatePointNotes = this.updatePointNotes.bind(this);
  }

  componentDidMount() {
      const url = `http://localhost:8080/users/${this.props.match.params.userID}/recordSets`
      const bearer_token = cookie.load('bearer_token')
      fetch(url, {
          method:'GET',
          headers: { // Right now this issues a hard fail if the request is not authorized.
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${bearer_token}`
          },
        })
        .then(response => response.json()) // convert reponse to json
        .then(data => {
          console.log(data)
          this.setState({
            users_record_sets: data.map(d => ({label: d['name'], value: d['ID']}))
          })
        });
    }

  handleSubmitAndRedirect(event) {
    event.preventDefault();
    const tmpState = {
      time: new Date().getTime(),
      units: this.state.units,
      value: this.state.value,
      notes: this.state.notes,
      recordSetID: this.state.recordSetID
    };
    const url = `http://localhost:8080/users/${this.props.match.params.userID}/recordSets/${this.state.recordSetID}/measurements`;
    const bearer_token = cookie.load('bearer_token')
    //prepare data a little more here....

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
            redirectURL: `/users/${this.props.match.params.userID}/recordSets/${this.state.recordSetID}/measurements/${pointID}`
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

  updatePointRecordSetID(event) {
    //@TODO add support for multi-entry / multi-select. First pass in comments below.
    this.setState({recordSetID: event.target.value})

  }

  dropdownTemplate(option) {
        if(!option.value) {
            return option.label;
        }
        else {
            return (
                <div className="p-clearfix">
                    <span style={{float:'right',margin:'.5em .25em 0 0'}}>{option.label}</span>
                </div>
            );
        }
    }

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
              <label> Record Set:</label>
              <div className="content-section implementation">
                  <Dropdown value={this.state.recordSetID} options={this.state.users_record_sets} onChange={this.updatePointRecordSetID} itemTemplate={this.dropdownTemplate}
                            filter={true} filterPlaceholder="Select Record Set" filterBy="label,value" showClear={true}/>
              </div>
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
