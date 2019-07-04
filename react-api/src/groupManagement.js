import React from 'react';
import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'
import Navigation from './components/navigation'
import EditGroups from './components/groupManagement/EditGroups'
import CreateGroups from './components/groupManagement/CreateGroups'

import {Dropdown} from 'primereact/dropdown'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


class GroupManagement extends React.Component {
    constructor() {
        super();
        this.state = {
            ui_config_params: [],
            groupOptions: [],
            userOptions: [],
            invalidNewGroups: []
        };
    }

    componentDidMount() {
      const url = `http://localhost:8082/UI-conf/groups`
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
          console.log(data)
          this.setState({
            ui_config_params: data,
            groupOptions: Object.keys(data['groups']).map((item) => ({label: item, value: item})),
            userOptions: Object.keys(data['users']).map((userID) => ({label: data['users'][userID], value: userID, groups: data['userGroupAssoc'][userID]})),
            invalidNewGroups: Object.keys(data['groups'])
          })
        });
    }

    render() {
        return (
          <div>
            <div className="head-nav">
              <Navigation userID={cookie.load('userID')}/>
            </div>
            <div className="main-page">
              <EditGroups 
              title={'Add a user to a permission group'}
              groupOptions={this.state.groupOptions}
              userOptions={this.state.userOptions}/>
              <CreateGroups
                title={'Add a new permission group'}
                invalidOptions={this.state.invalidNewGroups}
              />
            </div>
          </div>
        );
    }
}

export default GroupManagement;
