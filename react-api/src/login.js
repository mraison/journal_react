import React from 'react';
import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'
import LoginSignUp from './components/loginLogout/loginSignUp'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectURL: '',
      error: false
    };

    this.handleSubmitAndRedirect = this.handleSubmitAndRedirect.bind(this);
  }

  handleSubmitAndRedirect(event, username, password) {
    event.preventDefault();
    const data = {username: username, password: password};
    const url = `http://localhost:8081/request_jwt`;
    //prepare data a little more here....

    const jsonPostData = JSON.stringify(data)
    fetch(url, {
        method: 'POST',
        body: jsonPostData,
        headers: {
            'Content-Type': 'application/json'
        },
      }).then(response => {
            if (!response.ok) {
                throw Error(response.error_detail);
            }
            return response
          }
        )
        .then(response => response.json()) // convert reponse to json
        .then(data => {
          cookie.save('bearer_token', data['bearer_token'], {'path': '/'})
          cookie.save('userID', data['ID'], {'path': '/'})
          const userID = data['ID']
          console.log(data)
          this.setState({
            redirectURL: `/users/${userID}/recordSets`
          })
        })
        .catch(e => this.setState({error: true}));

  }

  render() {
    return (
      <div>
        <div>
          <LoginSignUp
            handleSubmitAndRedirect={this.handleSubmitAndRedirect}
            redirectURL={this.state.redirectURL}
          />
        </div>
        {this.state.error ?
          <div>
            <span>An error occured</span>
          </div>
          : []
        }
      </div>
    );
  }
}

export default Login;
