import { JSONSchema7 } from 'node_modules/@types/json-schema'
import { AjvError, ISubmitEvent, UiSchema, withTheme } from '@rjsf/core'
import { Theme } from '@rjsf/material-ui/v5'
import { capitalizeFirstLetter } from 'src/util'
import './style.scss'

import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'

import 'froala-editor/js/froala_editor.pkgd.min.js'

import 'froala-editor/js/plugins.pkgd.min.js'

import FroalaEditor from 'react-froala-wysiwyg'
import { useState } from 'react'
// import 'froala-editor/js/plugins/align.min.js'
// import 'froala-editor/js/plugins/code_view.min.js'
// import 'froala-editor/js/plugins/link.min.js'
// import 'froala-editor/js/plugins/font_family.min.js'
// import 'froala-editor/js/plugins/font_size.min.js'
// import 'froala-editor/js/plugins/table.min.js'
// import 'froala-editor/js/plugins/video.min.js'
// import 'froala-editor/js/plugins/image.min.js'
// import 'froala-editor/js/plugins/help.min.js'
// import 'froala-editor/js/plugins/fullscreen.min.js'
// import 'froala-editor/js/plugins/char_counter.min.js'

const Form = withTheme(Theme)

//   required: ['firstName', 'lastName'],
//   description: 'A simple form example.',
const charCountExceeded = () => {
  console.log('acb')
}
const config = {
  attribution: false,
  charCounterMax: 120,
  events: {
    'charCounter.exceeded': charCountExceeded,
  },
  fontFamily: {
    'Roboto,sans-serif': 'Roboto',
    'Oswald,sans-serif': 'Oswald',
    'Montserrat,sans-serif': 'Montserrat',
    "'Open Sans Condensed',sans-serif": 'Open Sans Condensed',
  },
  toolbarButtons: {
    moreText: {
      buttons: [
        'fontFamily',
        'fontSize',
        'paragraphFormat',
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        'textColor',
        'backgroundColor',
        'inlineClass',
        'inlineStyle',
        'clearFormatting',
      ],
    },

    moreParagraph: {
      buttons: [
        'alignLeft',
        'alignCenter',
        'formatOLSimple',
        'alignRight',
        'alignJustify',
        'formatOL',
        'formatUL',

        'paragraphStyle',
        'lineHeight',
        'outdent',
        'indent',
        'quote',
      ],
    },
    moreRich: {
      buttons: [
        'insertLink',
        'insertImage',

        'insertTable',
        'emoticons',
        'fontAwesome',
        'specialCharacters',
        'embedly',
        'insertFile',
        'insertHR',
      ],
    },
    moreMisc: {
      buttons: [
        'undo',
        'redo',
        'fullscreen',
        'insertHTML',
        'print',
        'getPDF',
        'spellChecker',
        'selectAll',
        'html',
        'clear',
        'alert',
        'help',
      ],
    },
  },
}
const schema: JSONSchema7 = {
  title: 'Edit Overview Section',
  type: 'object',
  required: [
    'overviewHeading',
    'overviewNavHeading',
    'overviewDescription',
    'overviewMoreDescription',
    'textEditor',
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
    textEditor: {
      type: 'string',
      title: 'Text Rich Editor',
      minLength: 120,
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
  overviewNavHeading: {},

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
  textEditor: {
    'ui:widget': 'myWidget',
  },
}
const CustomTextArea = (props: any) => {
  const [model, setModel] = useState('')
  const [innerConfig, setInnerConfig] = useState(config)
  const handleModelChange = (model: string) => {
    props.onChange(model)
    setModel(model)
    console.log(model)
  }
  return (
    <FroalaEditor
      config={innerConfig}
      model={model}
      onModelChange={handleModelChange}
      tag="textarea"
    />
  )
}
const widgets = {
  myWidget: CustomTextArea,
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

  const onSubmit = (
    e: ISubmitEvent<any>,
    nativeEvent: React.FormEvent<HTMLFormElement>
  ): void => {
    console.log('SUBMITTED')
    console.log(e.formData)
  }

  return (
    <div className="overview-form">
      <Form
        schema={schema}
        uiSchema={uiSchema}
        widgets={widgets}
        transformErrors={transformErrors}
        className="custom-form"
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default OverviewForm
