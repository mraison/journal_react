import React from 'react';
import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'
import Login from './login'
import SignUp from './signup'
import {TabView,TabPanel} from 'primereact/tabview';

class LoginSignUpPage extends React.Component {

  render() {
    return (
      <div className="content-section implementation">
        <TabView renderActiveOnly={false}>
            <TabPanel header="Login">
                <Login/>
            </TabPanel>
            <TabPanel header="Sign Up" rightIcon="pi pi-user">
                <SignUp/>
            </TabPanel>
        </TabView>
      </div>
    );
  }
}

export default LoginSignUpPage;
