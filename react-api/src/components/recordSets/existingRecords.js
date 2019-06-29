import React from 'react';
import { Link } from 'react-router-dom'

class ExistingRecords extends React.Component {
  constructor(props) {
    super(props);
  }


  generateRecordSetLinks(userRecordSets, userID) {
    let links = []
    if (typeof userRecordSets !== 'undefined') {
      userRecordSets.map( (recordSet) =>
        links.push(<div key={`set-${recordSet['ID']}`}><Link to={`/users/${userID}/recordSets/${recordSet['ID']}/measurements`}>{recordSet['name']}</Link>{' '}</div>)
      )
    }
    return links
  }

  render() {
    return (
      <div>
        <div>
          <span>{this.props.title}</span>
        </div>
        <div>
          {this.generateRecordSetLinks(this.props.userRecordSets, this.props.userID)}
        </div>
      </div>
    );
  }
}

export default ExistingRecords;