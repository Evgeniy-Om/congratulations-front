import React from 'react'
import {styled, TextField} from "@mui/material"
import { useFormContext } from 'react-hook-form'
import { ReactHookFormTextFieldTypes } from '../core/types'

const StyledTextField = styled(TextField)({
    marginBottom: "20px",
})

function ReactHookFormTextField ({name, type, label}: ReactHookFormTextFieldTypes) {
    const { register, formState: {errors} } = useFormContext()
    return (
        <StyledTextField
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

export default ReactHookFormTextField