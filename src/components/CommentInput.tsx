import TextFieldReactHookForm from "./TextFieldReactHookForm"

function CommentInput() {
    return (
        <TextFieldReactHookForm
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

export default CommentInput