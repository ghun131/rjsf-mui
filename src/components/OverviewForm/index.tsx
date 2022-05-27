import { Button, Grid } from '@mui/material'
import {
  AjvError,
  ISubmitEvent,
  ObjectFieldTemplateProps,
  UiSchema,
  withTheme,
} from '@rjsf/core'
import { Theme } from '@rjsf/material-ui/v5'
import { JSONSchema7 } from 'node_modules/@types/json-schema'
import { capitalizeFirstLetter } from 'src/util'
import AutocompleteTags from '../AutocompleteTags'
import ImageUploader from '../ImageUploader'
import './style.scss'

const Form = withTheme(Theme)

const HelloWidget = (props: any): JSX.Element => {
  console.log(props)
  return <p>Hello widget</p>
}

const widgets = {
  helloWidget: HelloWidget,
  autocompleteWidget: AutocompleteTags,
  uploadWidget: ImageUploader,
}

interface IOverviewFormProps {
  schema: JSONSchema7
  uiSchema: UiSchema
  submitButtonText?: string
  showSuccessMessage?: boolean
  hide?: boolean
  columns?: number
  spacing?: 0 | 6 | 4 | 3 | 1 | 2 | 5 | 7 | 8 | 9 | 10 | undefined
  disabled?: boolean
  onSubmit: (
    e: ISubmitEvent<any>,
    nativeEvent: React.FormEvent<HTMLFormElement>
  ) => void
}

const OverviewForm = (
  props: React.PropsWithChildren<IOverviewFormProps>
): JSX.Element => {
  const {
    columns,
    spacing = 0,
    submitButtonText = 'Submit',
    hide,
    children,
  } = props

  const transformErrors = (errors: AjvError[]): AjvError[] => {
    console.log(errors)

    return errors.map((error) => {
      const { property = '', name, message = '' } = error
      let normalizedCamelCaseName: string = property
        .replaceAll('.', '')
        .split(/(?=[A-Z])/)
        .join(' ')
      normalizedCamelCaseName = capitalizeFirstLetter(normalizedCamelCaseName)

      // if (name === 'minLength' || name === 'maxLength') {
      if (name === 'pattern') {
        error.message = 'Only digits are allowed'
      }

      if (name) {
        error.message = `${normalizedCamelCaseName} ${message}`
      }

      return error
    })
  }

  const getColumns = () => {
    if (columns === 1) {
      return 12
    }
    if (columns === 2) {
      return 6
    }
    if (columns === 3) {
      return 4
    }
    if (columns === 4) {
      return 3
    }
    // Default: 1 column
    return 12
  }

  const ObjectFieldTemplate = (props: ObjectFieldTemplateProps) => {
    const { title, description, properties, uiSchema, schema } = props

    return (
      <div>
        <p>{title}</p>
        <p>{description}</p>
        <Grid container spacing={spacing}>
          {properties.map(({ content, name }) => {
            const fieldUiSchema = uiSchema[name] ?? {}
            const fieldSchema: any = (schema.properties ?? {})[name] ?? {}
            const cols = fieldUiSchema['ui:column'] ?? 12

            return (
              <Grid key={name} item xs={cols}>
                <div className='property-wrapper'>{content}</div>
              </Grid>
            )
          })}
        </Grid>
      </div>
    )
  }

  const CustomFieldTemplate = (props: any) => {
    const {
      id,
      classNames,
      label,
      help,
      required,
      description,
      errors,
      children,
    } = props

    console.log(props)

    return (
      <div className={classNames}>
        <label htmlFor={id}>
          {label}
          {required ? '*' : null}
        </label>
        {description}
        {children}
        {errors}
        {help}
      </div>
    )
  }

  return (
    <div className='overview-form'>
      {!hide && (
        <Form
          {...props}
          showErrorList
          onError={(errs) => console.log(errs)}
          // FieldTemplate={CustomFieldTemplate}
          ObjectFieldTemplate={ObjectFieldTemplate}
          transformErrors={transformErrors}
          widgets={widgets}
        >
          {children && <div>{children}</div>}

          {!children && (
            <div style={{ marginTop: '2rem' }}>
              <Button
                type='submit'
                disabled={props.disabled}
                variant='contained'
                color='primary'
              >
                {submitButtonText}
              </Button>
            </div>
          )}
        </Form>
      )}
    </div>
  )

  // return (
  //   <div className='overview-form'>
  //     <Form
  //       schema={schema}
  //       uiSchema={uiSchema}
  //       transformErrors={transformErrors}
  //       className='custom-form'
  //       onSubmit={onSubmit}
  //     />
  //   </div>
  // )
}

export default OverviewForm
