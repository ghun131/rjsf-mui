import { JSONSchema7 } from 'node_modules/@types/json-schema'
import { AjvError, UiSchema, withTheme } from '@rjsf/core'
import { Theme } from '@rjsf/material-ui/v5'
import { capitalizeFirstLetter } from 'src/util'
import './style.scss'

const Form = withTheme(Theme)

const samepleSchema: JSONSchema7 = {
  title: 'Edit Overview Section',
  //   description: 'A simple form example.',
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

//   required: ['firstName', 'lastName'],
//   description: 'A simple form example.',

const schema: JSONSchema7 = {
  title: 'Edit Overview Section',
  type: 'object',
  required: [
    'overviewHeading',
    'overviewNavHeading',
    'overviewDescription',
    'overviewMoreDescription',
  ],
  properties: {
    overviewHeading: {
      type: 'string',
      title: 'Overview Heading',
      default: '',
      minLength: 3,
      maxLength: 40,
      //   required: ['Hello'],
    },
    overviewNavHeading: {
      type: 'string',
      title: 'Overview Nav Heading',
      default: '',
      minLength: 3,
      maxLength: 30,
    },
    overviewDescription: {
      type: 'string',
      title: 'Overview Description',
      default: '',
      minLength: 120,
    },
    overviewMoreDescription: {
      type: 'string',
      title: 'Overview More Description',
      default: '',
      required: ['hello'],
    },
    bannerIamges: {
      type: 'array',
      title: 'Banner Images',
      items: {
        type: 'string',
        format: 'data-url',
      },
    },
  },
}

// 'ui:help': 'Hint: Make it strong!',
// 'ui:widget': 'password',
// 'ui:widget': 'alt-datetime',

const uiSchema: UiSchema = {
  classNames: 'custom-css-class',
  overviewHeading: {
    'ui:autofocus': true,
    'ui:emptyValue': '',
    'ui:autocomplete': 'overview-heading',
    'ui:options': {
      //   rows: 2,
      //   columns: 10,
    },
    // 'ui:title': 'Title here',
    // 'ui:description': '(earthian year)',
  },

  age: {
    'ui:widget': 'updown',
    'ui:title': 'Age of person',
    'ui:description': '(earthian year)',
  },

  overviewDescription: {
    'ui:widget': 'textarea',
  },

  bannerIamges: {
    'ui:options': {
      accept: '.png, .jpg',
    },
    'ui:title': 'Title here',
  },
}

const OverviewForm = (): JSX.Element => {
  const transformErrors = (errors: AjvError[]): AjvError[] => {
    return errors.map((error) => {
      const { property = '', name, message = '' } = error
      let normalizedCamelCaseName: string = property
        .replaceAll('.', '')
        .split(/(?=[A-Z])/)
        .join(' ')
      normalizedCamelCaseName = capitalizeFirstLetter(normalizedCamelCaseName)

      if (name === 'minLength' || name === 'maxLength') {
        error.message = `${normalizedCamelCaseName} ${message}`
      }

      if (name === 'pattern') {
        error.message = 'Only digits are allowed'
      }

      return error
    })
  }

  return (
    <div className='overview-form'>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        transformErrors={transformErrors}
        className='custom-form'
      />
    </div>
  )
}

export default OverviewForm
