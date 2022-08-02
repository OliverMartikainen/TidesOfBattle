import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}))

const NativeSelector = ({ value, valueOptions, label, handleChange, disabled = false }) => {
    const classes = useStyles()

    const options = valueOptions.map(v => <option key={v} value={v}>{v}</option>)

    const labelLower = label.toLowerCase()
    const htmlFor = `${labelLower}-native-label-placeholder`

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor={htmlFor}>
                    {label}
                </InputLabel>
                <NativeSelect
                    disabled={disabled}
                    value={value}
                    onChange={(event) => handleChange(event.target.value)}
                    inputProps={{
                        name: labelLower,
                        id: htmlFor,
                    }}
                >
                    <option value={''}>None</option>
                    {options}
                </NativeSelect>
            </FormControl>
        </div>
    )
}

export default NativeSelector