import { useState } from 'react'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { top100Films } from '../OverviewForm/data'

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

  return (
    <Autocomplete
      multiple
      id={id}
      value={value}
      onChange={(event, newValue) => {
        setValue([
          //   ...fixedOptions,
          ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
        ])
      }}
      options={options}
      getOptionLabel={(option) => option.title}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            label={option.title}
            {...getTagProps({ index })}
            disabled={fixedOptions.indexOf(option) !== -1}
          />
        ))
      }
      //   style={{ width: 500 }}
      renderInput={(params) => <TextField {...params} label={inputLabel} />}
    />
  )
}

export default AutocompleteTags
