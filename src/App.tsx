import './App.scss'
import OverviewForm from './components/OverviewForm'
import { JSONSchema7 } from 'node_modules/@types/json-schema'
import { ISubmitEvent, UiSchema } from '@rjsf/core'
import { toolList } from './components/OverviewForm/data'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

export const schema: JSONSchema7 | Record<string, any> = {
  title: 'Edit Overview Section',
  type: 'object',
  required: ['heading', 'navHeading', 'description', 'moreDescription'],
  properties: {
    heading: {
      type: 'string',
      title: 'Overview Heading',
      // default: 'asdasdas',
      minLength: 3,
      maxLength: 40,
    },

    navHeading: {
      type: 'string',
      title: 'Overview Nav Heading',
      minLength: 3,
      maxLength: 30,
      // default: 'navHeading1',
    },

    description: {
      type: 'string',
      title: 'Overview Description',
      default: '',
      minLength: 10,
    },

    moreDescription: {
      type: 'string',
      title: 'Overview More Description',
      default: '',
      required: ['hello'],
    },

    bannerImages: {
      type: 'array',
      title: 'Banner Images',
      items: {
        type: 'object',
      },
      maxItems: 3,
      accept: {
        'image/*': [],
      },
      textPlaceholder: 'Drop files here',
    },

    toolLogos: {
      type: 'array',
      items: {
        type: 'object',
      },
      options: toolList,
      maxItems: 2,
      inputLabel: 'Tool Logos',
    },
  },

  // hello: {
  //   type: 'string',
  //   title: 'Hello',
  // },
}

export const uiSchema: UiSchema = {
  classNames: 'custom-css-class',
  overviewHeading: {
    'ui:autofocus': true,
    'ui:emptyValue': '',
    'ui:autocomplete': 'overview-heading',
    'ui:column': 6, // Custom property
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

  bannerImages: {
    'ui:options': {
      accept: '.png, .jpg',
    },
    'ui:title': 'Title here',
    'ui:widget': 'uploadWidget',
  },

  toolLogos: {
    'ui:widget': 'autocompleteWidget',
  },

  // hello: {
  //   'ui:widget': 'helloWidget',
  // },
  // 'ui:help': 'Hint: Make it strong!',
  // 'ui:widget': 'password',
  // 'ui:widget': 'alt-datetime',
}

const client = new ApolloClient({
  uri: process.env.REACT_APP_HASURA_URL ?? 'No uri env found',
  cache: new InMemoryCache(),
  headers: {
    'x-hasura-admin-secret':
      process.env.REACT_APP_HASURA_ADMIN_SECRET ?? 'No secret env found',
  },
})

const App = (): JSX.Element => {
  const onSubmit = (
    e: ISubmitEvent<any>,
    nativeEvent: React.FormEvent<HTMLFormElement>
  ): void => {
    // console.log(e)
    console.log('SUBMITTED', e.formData)
  }

  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  )
}

export default App
