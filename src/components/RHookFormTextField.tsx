import React from 'react'
import {styled, TextField as MUITextField} from "@mui/material"
import { useFormContext } from 'react-hook-form'

export default function ReactHookFormTextField<T extends Record<string, unknown>> ({name, label, ...rest}: Props & T) {
    const { register, formState: {errors} } = useFormContext()
    return (
        <TextField
            {...rest}
            {...register(name)}
            variant="outlined"
            label={label}
            error={!!errors[name]}
            helperText={errors[name]?.message}
        />
    )
}

// Types
type Props = {
    name: string
    label: string
}

// Styled Components
const TextField = styled(MUITextField)({
    marginBottom: "20px",
})