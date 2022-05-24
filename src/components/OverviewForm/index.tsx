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
import './style.scss'

const Form = withTheme(Theme)

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
    const { title, description, properties, uiSchema } = props

    return (
      <div>
        <p>{title}</p>
        <p>{description}</p>
        <Grid container spacing={spacing}>
          {properties.map(({ content, name }) => {
            const fieldSchema = uiSchema[name] ?? {}
            const cols = fieldSchema['ui:column'] ?? 12

            return (
              <Grid item xs={cols}>
                <div className='property-wrapper'>{content}</div>
              </Grid>
            )
          })}
        </Grid>
      </div>
    )
  }

  return (
    <div className='overview-form'>
      {!hide && (
        <Form
          {...props}
          ObjectFieldTemplate={ObjectFieldTemplate}
          transformErrors={transformErrors}
        >
          {children && <div className={''}>{children}</div>}
          {!children && (
            <div className={''}>
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
