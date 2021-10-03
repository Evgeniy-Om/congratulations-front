import {createTheme} from "@mui/material"

const theme = createTheme({
    palette: {
        primary: { main: '#1976d2' },
    },
    shape: {
        borderRadius: "5px"
    },
    typography: {
        button: {
            // textTransform: "none",
        }
    }
});

export default theme