import TextField from "../TextField"

function NameInput() {
    return (
        <TextField
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