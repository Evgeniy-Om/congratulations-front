import {Checkbox as MUICheckbox, FormControlLabel, styled} from "@mui/material"
import {useFormContext} from 'react-hook-form'


export default function Checkbox_ReactHookForm({name, label}: Props) {
    const {register} = useFormContext()
    return (
        <Styled.Label
            {...register(name)}
            control={<MUICheckbox defaultChecked/>}
            label={label}/>
    )
}

// Styled Components
const Styled = {
    Label: styled(FormControlLabel)({
        margin: "0 auto 10px",
    }),
}

// Types
type Props = {
    name: string
    label: string
}