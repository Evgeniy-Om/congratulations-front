import {Paper, styled} from "@mui/material"
import React from "react"

export default function PaperContainer({children}: Props) {
    return (
        <_.Container>
            <_.Paper>
                {children}
            </_.Paper>
        </_.Container>
    )
}

// _ Components
const _ = {
    Container: styled('div')({
        display: 'flex',
        minHeight: "100vh",
        padding: "100px 0",
        backgroundColor: '#f5f5f5',
    }),
    Paper: styled(Paper)({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        minWidth: "440px",
        margin: "auto",
        padding: '20px',
        '@media (max-width:460px)': {
            width: "95%",
            minWidth: "350px",
        },
    })
}

// Types
type Props = {
    children: React.ReactNode,
};
