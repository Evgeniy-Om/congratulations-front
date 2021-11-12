import TextFieldReactHookForm from "./TextFieldReactHookForm"

function NameInput() {
    return (
        <TextFieldReactHookForm
            name="bday_name"
            type="text"
            label="Кого поздравить?"
            isWatch={true}
            maxLength={40}
            required
        />
    )
}

export default NameInput