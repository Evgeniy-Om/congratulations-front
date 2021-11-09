import TextField_ReactHookForm from "./TextField_ReactHookForm"

function TextFieldComment() {
    return (
        <TextField_ReactHookForm
            name="comment"
            type="text"
            label="Комментарии"
            isWatch={true}
            multiline
            rows={4}
            maxLength={150}
        />
    )
}

export default TextFieldComment