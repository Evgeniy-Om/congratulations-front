import React from 'react'
import {styled, TextField} from "@mui/material"
import {useFormContext} from 'react-hook-form'

// function TextFieldReactHookForm<T extends Record<string, unknown>>({name, isWatch, limitSymbols, ...rest}: Props & T) {
function TextFieldReactHookForm<T extends Record<string, unknown>>(props: Props & T) {
    const {name, isWatch, maxLength, inputProps, ...rest} = props
    const {register, formState: {errors}, watch} = useFormContext()
    console.log(maxLength)
// debugger
    return (
        <_.Wrapper>
            <_.TextField
                {...rest}
                {...register(name)}
                variant="outlined"
                error={Boolean(errors[name])}
                helperText={errors[name]?.message}
                inputProps={{
                    ...inputProps,
                    maxlength: maxLength,
                }}
            />
            {
                isWatch &&
                <_.Counter error={errors[name]}>
                    {watch(name)?.length ?? 0}/{maxLength ?? "Не указана максимальная длина"}
                </_.Counter>
            }
        </_.Wrapper>
    )
}

export default TextFieldReactHookForm

// Types
type Props = {
    name: string
    label: string
    isWatch?: boolean
    maxLength?: number
    inputProps?: Record<string, unknown>
}

// _ Components
const _ = {
    Wrapper: styled("div")({
        position: "relative",
        width: "100%",
        marginBottom: "25px",
    }),
    TextField: styled(TextField)({

        width: "100%",
        marginBottom: "5px",
    }),
    Counter: styled("div")<any>(({theme, ...props}) => ({
        position: "absolute",
        bottom: props.error ? 0 : "-20px",
        right: 0,
        textAlign: "right",
        fontSize: "13px",
        color: theme.palette.grey[500]
    })),
}
