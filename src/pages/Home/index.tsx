import { useMutation } from '@apollo/client'
import { ISubmitEvent, UiSchema } from '@rjsf/core'
import { JSONSchema7 } from 'node_modules/@types/json-schema'
import OverviewForm from 'src/components/OverviewForm'
import { toolList } from 'src/components/OverviewForm/data'
import {
  CREATE_ONE_OVERVIEW,
  UPSERT_ONE_OVERVIEW,
} from 'src/components/OverviewForm/query-and-mutation'
import { isObjectEmpty } from 'src/util'
import './style.scss'

export const schema: JSONSchema7 | Record<string, any> = {
  title: 'Edit Overview Section',
  type: 'object',
  required: ['heading', 'navHeading', 'description', 'moreDescription'],
  properties: {
    id: {
      type: 'number',
      hide: true,
    },

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
}

const hidden = () => <div />

export const uiSchema: UiSchema = {
  classNames: 'custom-css-class',

  heading: {
    'ui:autofocus': true,
    'ui:emptyValue': '',
    'ui:autocomplete': 'overview-heading',
    'ui:column': 6, // Custom property
  },

  navHeading: {
    'ui:column': 6,
  },

  age: {
    'ui:widget': 'updown',
    'ui:title': 'Age of person',
    'ui:description': '(earthian year)',
  },

  description: {
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

  // 'ui:help': 'Hint: Make it strong!',
  // 'ui:widget': 'password',
  // 'ui:widget': 'alt-datetime',
}

interface IOverview {
  id: number
  heading: string
  navHeading: string
  moreDescription: string
  description: string
  bannerImages: string[]
}

const GRID_SPACING = 3
const GRID_COLUMN: number = 2

const Home = (): JSX.Element => {
  const [
    upsertOneOverview,
    { data: mutationData, loading, error: mutationError },
  ] = useMutation(UPSERT_ONE_OVERVIEW)

  async function onSubmit(
    e: ISubmitEvent<IOverview>,
    nativeEvent: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    const { formData } = e
    if (isObjectEmpty(formData)) {
      console.error('Empty form data')
      return
    }
    const { id, heading, navHeading, description, moreDescription } = formData

    upsertOneOverview({
      variables: {
        id,
        heading,
        nav_heading: navHeading,
        description,
        view_more_description: moreDescription,
      },
    })
  }

  return (
    <>
      <OverviewForm
        schema={schema}
        hide={false}
        spacing={GRID_SPACING}
        columns={GRID_COLUMN}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        disabled={loading}
      />
    </>
  )
}

export default Home
