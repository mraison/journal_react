import React from 'react';
import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'

import {InputText} from 'primereact/inputtext';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import '../../styles/groupManagement/CreateGroups.css'


class CreateGroups extends React.Component {
    constructor() {
        super();
        this.state = {
            newUserGroup: '',
            validSelection: true
        };
        
        this.onGroupChange = this.onGroupChange.bind(this);
        this.handleSubmitAndRedirect = this.handleSubmitAndRedirect.bind(this)
    }

    onGroupChange(event) {
        // if (invalidOptions.includes(e.value)) {
        //     this.setState({
        //         newUserGroup: e.value,
        //         validSelection: false
        //     });
        // } else {
            this.setState({newUserGroup: event.target.value});
        // }
    }

    handleSubmitAndRedirect(event) {
        event.preventDefault();
        // console.log(this.state)
        const data = {groupName: this.state.newUserGroup}
        const url = `http://localhost:8082/groups`;
        const bearer_token = cookie.load('bearer_token')
        //prepare data a little more here....

        const jsonPostData = JSON.stringify(data)
        console.log(jsonPostData)

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

    render() {
        return (
            <div className="CreateGroups">
              <h4>{this.props.title}</h4>
              <form>
                <div>
                    <InputText value={this.state.newUserGroup} onChange={this.onGroupChange} />
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

export default CreateGroups;
