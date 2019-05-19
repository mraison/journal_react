import React from 'react'

const InputField = ({
  FieldName,
  FieldValue

}) => {
  return (
    <div>
      <label> {FieldName}:
        <input type="text" name={FieldName} value={FieldValue}/>
      </label>
    </div>
  )
};

export default InputField