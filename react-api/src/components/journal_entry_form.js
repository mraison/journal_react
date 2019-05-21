import React from 'react';
import InputField from './InputField';


class JournalEntryForm extends React.Component {
	constructor(props) {
	    super(props);

	    this.state = {
	      Rows: props.Rows,
	    };
	  }


  createTable(Rows) {
    let table = [];

	// Outer loop to create parent
	for (let i = 0; i < Rows.length; i++) {
	  //Create the parent and add the children
	  table.push(
	  		<InputField FieldName={this.state.Rows[i].FieldName} FieldValue={this.state.Rows[i].FieldValue} />
	  	)
	}
	console.log(table)
	return table
  }


  render() {
    return(
      <table>
        {this.createTable(this.state.Rows)}
      </table>
    )
  }

}

export default JournalEntryForm