import React from 'react'
import {styled, TextField} from "@mui/material"
import {useFormContext} from 'react-hook-form'

function TextField_ReactHookForm<T extends Record<string, unknown>>({name, isWatch, ...rest}: Props & T) {
    const {register, formState: {errors}, watch} = useFormContext()

    return (
        <Styled.Wrapper>
            <Styled.TextField
                {...rest}
                {...register(name)}
                variant="outlined"
                error={Boolean(errors[name])}
                helperText={errors[name]?.message}
            />
            {isWatch && <Styled.Counter error={Boolean(errors[name])}>{watch(name)?.length}/20</Styled.Counter>}
        </Styled.Wrapper>
    )
}

export default TextField_ReactHookForm

// Types
type Props = {
    name: string
    label: string
    isWatch?: boolean
}

// Styled Components
const Styled = {
    Wrapper: styled("div")({
        position: "relative",
        width: "100%",
        marginBottom: "25px",
    }),
    TextField: styled(TextField)({

        width: "100%",
        marginBottom: "5px",
    }),
    Counter: styled("div")<any>(({...props}) => ({
        position: "absolute",
        bottom: props.error ? 0 : "-20px",
        right: 0,
        textAlign: "right",
    })),
}

