import React from 'react';
import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'

class LoginSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: undefined,
      password: undefined
    };

    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  updateUsername(event) {
    this.setState({username: event.target.value})
  }
  updatePassword(event) {
    this.setState({password: event.target.value})
  }

  renderRedirect(redirectURL) {
    if (redirectURL.length > 0) {
      return <Redirect to={redirectURL}/>
    }
  }

  render() {
    return (
      <div>
        {this.renderRedirect(this.props.redirectURL)}
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
              onClick={(e) => this.props.handleSubmitAndRedirect(e, this.state.username, this.state.password)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginSignUp;
