import React from 'react'
import {styled, TextField as MUITextField} from "@mui/material"
import { useFormContext } from 'react-hook-form'

export default function ReactHookFormTextField ({name, type, label}: Props) {
    const { register, formState: {errors} } = useFormContext()
    return (
        <TextField
            {...register(name)}
            type={type}
            variant="outlined"
            label={label}
            error={!!errors[name]}
            helperText={errors[name]?.message}
            required
        />
    )
}

// Types
type Props = {
    name: string
    type: string
    label: string
}

// Styled Components
const TextField = styled(MUITextField)({
    marginBottom: "20px",
})