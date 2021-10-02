import {store} from "./core/store/store"
import {Provider} from "react-redux"
import {Box, CssBaseline, Paper} from "@mui/material"
import {StyledEngineProvider} from '@mui/material/styles'
import Routes from "./core/routes"

function App() {
    return (
        <StyledEngineProvider injectFirst>
            <Provider store={store}>
                <CssBaseline/>
                <Box sx={{
                    display: 'flex',
                    height: '100vh',
                    backgroundColor: '#f5f5f5',

                }}>
                    <Paper sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: "center",
                        minWidth: 500,
                        margin: 'auto',
                        marginTop: 'calc(100vh * 0.3)',
                        padding: '20px',
                    }}>
                        <Routes/>
                    </Paper>
                </Box>
            </Provider>
        </StyledEngineProvider>
    )
}

export default App
