import React from 'react'
import {styled, TextField} from "@mui/material"
import {useFormContext} from 'react-hook-form'

// function TextField_ReactHookForm<T extends Record<string, unknown>>({name, isWatch, limitSymbols, ...rest}: Props & T) {
function TextField_ReactHookForm<T extends Record<string, unknown>>(props: Props & T) {
    const {name, isWatch, maxLength, ...rest} = props
    const {register, formState: {errors}, watch} = useFormContext()
    console.log(maxLength)

    return (
        <Styled.Wrapper>
            <Styled.TextField
                {...rest}
                {...register(name)}
                variant="outlined"
                error={Boolean(errors[name])}
                helperText={errors[name]?.message}
                inputProps={{
                    maxlength: maxLength,
                }}
            />
            {
                isWatch &&
                <Styled.Counter error={errors[name]}>
                    {watch(name)?.length ?? 0}/{maxLength ?? "Не указана максимальная длина"}
                </Styled.Counter>
            }
        </Styled.Wrapper>
    )
}

export default TextField_ReactHookForm

// Types
type Props = {
    name: string
    label: string
    isWatch?: boolean
    maxLength?: number
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
    Counter: styled("div")<any>(({theme, ...props}) => ({
        position: "absolute",
        bottom: props.error ? 0 : "-20px",
        right: 0,
        textAlign: "right",
        fontSize: "13px",
        color: theme.palette.grey[500]
    })),
}

