import TextField from "../TextField"

function CommentInput() {
    return (
        <TextField
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