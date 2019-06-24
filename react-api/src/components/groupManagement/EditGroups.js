import React from 'react';
import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'

import {Dropdown} from 'primereact/dropdown'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


class EditGroups extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedUserGroup: null,
            selectedUser: null
        };
        
        this.onGroupChange = this.onGroupChange.bind(this);
        this.onUserChange = this.onUserChange.bind(this);
        this.handleSubmitAndRedirect = this.handleSubmitAndRedirect.bind(this);
    }

    onGroupChange(e) {
        this.setState({selectedUserGroup: e.target.value});
    }

    onUserChange(e) {
      this.setState({selectedUser: e.target.value})
    }

    handleSubmitAndRedirect(event) {
      event.preventDefault();
        const data = {userID: this.state.selectedUser}
        const url = `http://localhost:8082/groups/${this.state.selectedUserGroup}/users`;
        const bearer_token = cookie.load('bearer_token')
        //prepare data a little more here....

        const jsonPostData = JSON.stringify(data)

        fetch(url, {
            method: 'POST',
            body: jsonPostData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearer_token}`
            },
          }).then(response => response.json()) // convert reponse to json
            .then(data => {
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

    userDropdownTemplate(option, selectedGroup) {
      if(!option.value) {
            return option.label;
        }
        else {
            return (
                <div className="p-clearfix">
                    {option.groups.includes(selectedGroup)
                      ? <span style={{display:'inline-block',margin:'5px 0 0 5px'}} width="24">&#10003;</span>
                      : []
                    }
                    <span style={{float:'right',margin:'.5em .25em 0 0'}}>{option.label}</span>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="EditGroups">
              <h4>{this.props.title}</h4>
              <form>
                <div>
                    <div className="content-section implementation">
                        <Dropdown value={this.state.selectedUserGroup} options={this.props.groupOptions} onChange={this.onGroupChange} itemTemplate={this.groupDropdownTemplate}
                                  filter={true} filterPlaceholder="Select Group" filterBy="label,value" showClear={true}/>
                    </div>
                    <div className="content-section implementation">
                        <Dropdown value={this.state.selectedUser} options={this.props.userOptions} onChange={this.onUserChange} itemTemplate={(options) => this.userDropdownTemplate(options, this.state.selectedUserGroup)}
                                  filter={true} filterPlaceholder="Select User" filterBy="label,value" showClear={true}/>
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
        );
    }
}

export default EditGroups;
