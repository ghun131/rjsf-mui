import Autocomplete, {
  AutocompleteRenderGetTagProps,
} from '@mui/material/Autocomplete'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import { useState } from 'react'

interface ITagProps {
  title: string
}

interface IAutocompleteTagsProps {
  id?: string
  schema: any
  onChange?: any
  value?: [string]
}

// const AutocompleteTags2 = (props: any): JSX.Element => {
//   const { onChange } = props
//   const {
//     schema: { options, inputLabel },
//   } = props

//   console.log({ options, inputLabel })

//   const onInputChange = (e: any) => {
//     const value = e.target.value
//     onChange([value])
//   }

//   return <input type='text' onChange={onInputChange} />
// }

const AutocompleteTags = (props: IAutocompleteTagsProps): JSX.Element => {
  const {
    id = 'fixed-tags',
    schema: { options, inputLabel },
    onChange,
  } = props

  console.log(props)

  // const fixedOptions = [top100Films[6]]
  const fixedOptions: any[] = []
  const [value, setValue] = useState([...fixedOptions])

  const onValueChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: any[]
  ) => {
    const valueList = [
      //   ...fixedOptions,
      ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
    ]
    setValue(valueList)
    onChange(valueList)
  }

  const filterOptions = (options: any, state: any) => {
    const input = state.inputValue
    if (!input) return options
    const filteredOptions = options.filter((option: any) => {
      return option.title.toLowerCase().includes(input.toLowerCase())
    })
    return filteredOptions
  }

  const renderTags = (
    tagValue: any[],
    getTagProps: AutocompleteRenderGetTagProps
  ) =>
    tagValue.map((option, index) => (
      <Chip
        label={option.title}
        {...getTagProps({ index })}
        disabled={fixedOptions.indexOf(option) !== -1}
      />
    ))

  return (
    <Autocomplete
      multiple
      id={id}
      value={value}
      onChange={onValueChange}
      options={options}
      getOptionLabel={(option) => option.title}
      filterOptions={filterOptions}
      renderTags={renderTags}
      renderInput={(params) => <TextField {...params} label={inputLabel} />}
    />
  )
}

export default AutocompleteTags
