import './App.scss'
import OverviewForm from './components/OverviewForm'
import { JSONSchema7 } from 'node_modules/@types/json-schema'
import { ISubmitEvent, UiSchema } from '@rjsf/core'

export const schema: JSONSchema7 = {
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

export const uiSchema: UiSchema = {
  classNames: 'custom-css-class',
  overviewHeading: {
    'ui:autofocus': true,
    'ui:emptyValue': '',
    'ui:autocomplete': 'overview-heading',
    'ui:column': 6, // Custom property
    // 'ui:title': 'Title here',
    // 'ui:description': '(earthian year)',
  },

  overviewNavHeading: {
    'ui:column': 6,
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
  // 'ui:help': 'Hint: Make it strong!',
  // 'ui:widget': 'password',
  // 'ui:widget': 'alt-datetime',
}

const App = (): JSX.Element => {
  const onSubmit = (
    e: ISubmitEvent<any>,
    nativeEvent: React.FormEvent<HTMLFormElement>
  ): void => {
    console.log('SUBMITTED')
    console.log(e.formData)
  }

  return (
    <div className='App'>
      <OverviewForm
        schema={schema}
        hide={false}
        spacing={3}
        columns={2}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
      >
        {/* <Button type='submit' variant='contained' color='primary'>
          Login
        </Button>
        &nbsp;
        <Button variant='contained' color='primary'>
          Forgot Password
        </Button> */}
      </OverviewForm>
    </div>
  )
}

export default App
