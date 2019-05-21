import React from 'react'
import styles from '../styles/InputField.css'

const InputField = ({
  FieldName,
  FieldValue

}) => {
  return (
    <div className="f">
      <label> {FieldName}:
          <input className="inputfield" type="text" name={FieldName} value={FieldValue}/>
      </label>
    </div>
  )
};

export default InputField