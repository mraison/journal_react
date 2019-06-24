import {InputText} from 'primereact/inputtext';

export const FieldValidationToolTip(props) => (
	(props.show ? 
		<InputText 
			type="text" 
			placeholder="top" 
			tooltip={props.message} 
			tooltipOptions={{showDelay: 1000, hideDelay: 300}}
		/>
	: []
	)
)