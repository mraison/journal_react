import React from 'react';
import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'
import Navigation from './components/navigation'
import ExistingRecords from './components/recordSets/existingRecords'
import RecordCreator from './components/recordSets/recordCreator'


import {Dropdown} from 'primereact/dropdown'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


class GroupManagement extends React.Component {
    constructor() {
        super();
        this.state = {
            users_record_sets: []
            // ui_config_params: [],
            // groupOptions: [],
            // userOptions: [],
            // invalidNewGroups: []
        };
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
            users_record_sets: data
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
              <ExistingRecords
                title={'Current available record sets:'}
                userRecordSets={this.state.users_record_sets}
                userID={this.props.match.params.userID}
              />
              <RecordCreator userID={this.props.match.params.userID}/>
            </div>
          </div>
        );
    }
}

export default GroupManagement;
