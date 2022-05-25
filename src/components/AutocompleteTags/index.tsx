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
  options: ITagProps[]
  inputLabel: string
}

const AutocompleteTags = (props: IAutocompleteTagsProps): JSX.Element => {
  const { id = 'fixed-tags', options = [], inputLabel = '' } = props
  // const fixedOptions = [top100Films[6]]
  const fixedOptions: any[] = []
  const [value, setValue] = useState([...fixedOptions])

  const onChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: any[]
  ) => {
    setValue([
      //   ...fixedOptions,
      ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
    ])
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
      onChange={onChange}
      options={options}
      getOptionLabel={(option) => option.title}
      filterOptions={filterOptions}
      renderTags={renderTags}
      //   style={{ width: 500 }}
      renderInput={(params) => <TextField {...params} label={inputLabel} />}
    />
  )
}

export default AutocompleteTags
