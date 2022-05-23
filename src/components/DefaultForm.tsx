// import { withTheme } from '@rjsf/core';
// import Theme from '@rjsf/material-ui/v5';

// // Make modifications to the theme with your own fields and widgets

// const MyForm = withTheme(Theme);

import Form from '@rjsf/core'
import { JSONSchema7 } from 'node_modules/@types/json-schema/'

const schema: JSONSchema7 = {
  title: 'A registration form',
  description: 'A simple form example.',
  type: 'object',
  required: ['firstName', 'lastName'],
  properties: {
    firstName: {
      type: 'string',
      title: 'First name',
      default: 'Chuck',
    },
    lastName: {
      type: 'string',
      title: 'Last name',
    },
    telephone: {
      type: 'string',
      title: 'Telephone',
      minLength: 10,
    },
  },
}

const uiSchema = {
  classNames: 'custom-css-class',
}

const DefaultForm = () => {
  return <Form schema={schema} uiSchema={uiSchema} />
}

export default DefaultForm
