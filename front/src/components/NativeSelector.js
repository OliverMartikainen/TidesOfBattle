
import { InputLabel, FormControl, NativeSelect } from '@mui/material'

const formControlStyle = { margin: '2rem', minWidth: 120 }

const NativeSelector = ({ value, valueOptions, label, handleChange, disabled = false }) => {

    const options = valueOptions.map(v => <option key={ v } value={ v }>{ v }</option>)

    const labelLower = label.toLowerCase()
    const htmlFor = `${labelLower}-native-label-placeholder`

    return (
        <div>
            <FormControl style={ formControlStyle } >
                <InputLabel shrink htmlFor={ htmlFor }>
                    { label }
                </InputLabel>
                <NativeSelect
                    disabled={ disabled }
                    value={ value }
                    onChange={ (event) => handleChange(event.target.value) }
                    inputProps={ {
                        name: labelLower,
                        id: htmlFor,
                    } }
                >
                    <option value={ '' }>None</option>
                    { options }
                </NativeSelect>
            </FormControl>
        </div>
    )
}

export default NativeSelector