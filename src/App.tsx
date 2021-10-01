import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom"
import Home from "./pages/Home"
import {store} from "./core/store/store"
import {Provider} from "react-redux"
import New from "./pages/New"
import Edit from "./pages/Edit"
import {Box, CssBaseline, Paper} from "@mui/material"
import {StyledEngineProvider} from '@mui/material/styles'
import Login from "./pages/Login"
import Agreement from "./pages/Agreement"
import Registration from "./pages/Registration"

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
                        <Router>
                            <div>
                                <Switch>
                                    <Route path="/edit">
                                        <Edit/>
                                    </Route>
                                    <Route path="/new">
                                        <New/>
                                    </Route>
                                    <Route path="/login">
                                        <Login/>
                                    </Route>
                                    <Route path="/registration">
                                        <Registration/>
                                    </Route>
                                    <Route path="/agreement">
                                        <Agreement/>
                                    </Route>
                                    <Route path="/">
                                        <Home/>
                                    </Route>
                                </Switch>
                            </div>
                        </Router>
                    </Paper>
                </Box>
            </Provider>
        </StyledEngineProvider>
    )
}

export default App
