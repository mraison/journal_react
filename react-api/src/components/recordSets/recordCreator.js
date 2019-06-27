import React from 'react';
import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'

import {Dropdown} from 'primereact/dropdown'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


class RecordCreator extends React.Component {
    constructor() {
        super();
        this.state = {
            ui_config_params: [],
            permissionGroupOptions: [],

            selectedName: null,
            selectedPermissionGroupName: null,
            selectedGroupActions: '',
            selectedGlobalAccessibleAction: ''
        };

        this.updateSelectedName = this.updateSelectedName.bind(this);
        this.updateSelectedPermissionGroupName = this.updateSelectedPermissionGroupName.bind(this);
        this.updateSelectedGroupActions = this.updateSelectedGroupActions.bind(this);
        this.updateSelectedGlobalAccessibleAction = this.updateSelectedGlobalAccessibleAction.bind(this);

        this.handleSubmitAndRedirect = this.handleSubmitAndRedirect.bind(this)
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
            permissionGroupOptions: Object.keys(data['groups']).map((item) => ({label: item, value: item})),
          })
        });
    }

    updateSelectedName(event) {return this.setState({selectedName: event.target.value})}
    updateSelectedPermissionGroupName(event) {return this.setState({selectedPermissionGroupName: event.target.value})}
    updateSelectedGroupActions(event) {return this.setState({selectedGroupActions: event.target.value})}
    updateSelectedGlobalAccessibleAction(event) {return this.setState({selectedGlobalAccessibleAction: event.target.value})}

    handleSubmitAndRedirect(event) {
      event.preventDefault()
      const tmpState = {
        name: this.state.selectedName,
        permissionGroupName: this.state.selectedPermissionGroupName,
        groupPermissionsActions: this.state.selectedGroupActions,
        globalPermissionsActions: this.state.selectedGlobalAccessibleAction
      }

      const url = `http://localhost:8080/users/${this.props.userID}/recordSets`;
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
            window.location.reload();
          });

    }

    groupDropdownTemplate(option) {
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

    render() {
        return (
          <div>
            <div className="main-page">
              <form>
                <div>
                  <label> Record Set Name:
                      <input
                        className="name"
                        type="text"
                        name="selectedName"
                        onChange={this.updateSelectedName}
                      />
                  </label>
                </div>
                <div>
                  <label>Permission Group Name:</label>
                    <div id='groupsDropdown'>
                        <Dropdown value={this.state.selectedPermissionGroupName} options={this.state.permissionGroupOptions} onChange={(e) => {this.setState({selectedPermissionGroupName: e.target.value})}} itemTemplate={this.groupDropdownTemplate}
                                  filter={true} filterPlaceholder="Select Group" filterBy="label,value" showClear={true}/>
                    </div>
                </div>
                <div>
                  <label> Group Actions:
                      <input
                        className="selectedGroupActions"
                        type="text"
                        name="selectedGroupActions"
                        onChange={this.updateSelectedGroupActions}
                      />
                  </label>
                </div>
                <div>
                  <label> Global Accessible Action:
                      <input 
                        className="selectedGlobalAccessibleAction" 
                        type="text" 
                        name="selectedGlobalAccessibleAction"
                        onChange={this.updateSelectedGlobalAccessibleAction}
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

export default RecordCreator;
