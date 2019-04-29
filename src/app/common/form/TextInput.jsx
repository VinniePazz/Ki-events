import React from 'react'
import { Form, Label } from 'semantic-ui-react'

const TextInput = ({input, width, type, placeholder, meta: {touched, error, active}}) => {
  return (
    <Form.Field error={touched && !!error} width={width} required>
      <input {...input} placeholder={placeholder} type={type}/>
      {touched && error && !active && <Label basic color='red'>{error}</Label>}
    </Form.Field>
  )
}

export default TextInput
