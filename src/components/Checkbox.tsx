import {Checkbox as MUICheckbox, FormControlLabel, styled} from "@mui/material"
import {useFormContext} from 'react-hook-form'


export default function Checkbox({name, label}: Props) {
    const {register} = useFormContext()
    return (
        <_.Label
            {...register(name)}
            control={<MUICheckbox defaultChecked/>}
            label={label}/>
    )
}

// _ Components
const _ = {
    Label: styled(FormControlLabel)({
        margin: "0 auto 10px",
    }),
}

// Types
type Props = {
    name: string
    label: string
}