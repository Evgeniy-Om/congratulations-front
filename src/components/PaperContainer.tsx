import {Paper as MUIPaper, styled} from "@mui/material"
import React from "react"

export default function PaperContainer({children}: Props) {
    return (
        <Styled.Container>
            <Styled.Paper>
                {children}
            </Styled.Paper>
        </Styled.Container>
    )
}

// Styled Components
const Styled = {
    Container: styled('div')({
        display: 'flex',
        minHeight: "100vh",
        padding: "100px 0",
        backgroundColor: '#f5f5f5',
    }),
    Paper: styled(MUIPaper)({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        minWidth: 500,
        margin: "auto",
        padding: '20px',
    })
}

// Types
type Props = {
    children: React.ReactNode,
};
