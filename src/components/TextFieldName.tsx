import TextField_ReactHookForm from "./TextField_ReactHookForm"

function TextFieldName() {
    return (
        <TextField_ReactHookForm
            name="bday_name"
            type="text"
            label="Кого поздравить?"
            isWatch={true}
            maxLength={40}
            required
        />
    )
}

export default TextFieldName