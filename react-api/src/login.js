import React from 'react';
import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'

class journalEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      units: undefined,
      value: undefined,
      notes: '',
      tags: []
      // requiredFields: ['units', 'values', 'notes']
    };

    this.handleSubmitAndRedirect = this.handleSubmitAndRedirect.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  componentDidMount = () => {
    this.setState({
      userID: this.props.match.params.userID
    })
  }

  handleSubmitAndRedirect(event) {
    event.preventDefault();
    const tmpState = this.state;
    const url = `http://localhost:8081/request_jwt`;
    //prepare data a little more here....

    const jsonPostData = JSON.stringify(tmpState)
    fetch(url, {
        method: 'POST',
        body: jsonPostData,
        headers: {
            'Content-Type': 'application/json'
        },
      }).then(response => response.json()) // convert reponse to json
        .then(data => {
          cookie.save('bearer_token', data['bearer_token'], {'path': '/'})
          cookie.save('userID', data['ID'], {'path': '/'})
          const userID = data['ID']
          this.setState({
            redirectURL: `/users/${userID}/points`
          })
        });

  }

  updateUsername(event) {
    this.setState({username: event.target.value})
  }
  updatePassword(event) {
    this.setState({password: event.target.value})
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
        <form>
          <div>
            <label> Username:
                <input
                  className="inputfield"
                  type="text"
                  name="username"
                  onChange={this.updateUsername}
                />
            </label>
          </div>
          <div>
            <label> Password:
                <input
                  className="inputfield" 
                  type="text" 
                  name="password"
                  onChange={this.updatePassword}
                />
            </label>
          </div>
          <div>
            <button
              onClick={this.handleSubmitAndRedirect}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default journalEntry;
