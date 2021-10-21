import {Checkbox as MUICheckbox, FormControlLabel, styled} from "@mui/material"
import {useFormContext} from 'react-hook-form'


export default function ReactHookFormCheckbox({name, label}: Props) {
    const {register} = useFormContext()
    return (
        <Styled.Label
            control={<MUICheckbox {...register(name)} defaultChecked/>}
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