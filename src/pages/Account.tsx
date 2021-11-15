import { styled } from "@mui/material";
import BackButton from "../components/BackButton";

function Account() {


    return (
        <_.Wrapper>
            Account
            <BackButton/>
        </_.Wrapper>
    )
}

export default Account

const _ = {
    Wrapper: styled("div")({
        display: "flex",
        flexDirection: "column"
    })
}