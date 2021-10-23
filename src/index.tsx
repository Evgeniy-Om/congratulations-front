import ReactDOM from 'react-dom'
import App from './App'
import {CssBaseline, ThemeProvider} from "@mui/material"
import theme from './core/theme'
import {StyledEngineProvider} from "@mui/material/styles"
import {Provider} from "react-redux"
import {store} from "./core/store/store"


ReactDOM.render(
    <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
            <Provider store={store}>
                <CssBaseline/>
                <App/>
            </Provider>
        </StyledEngineProvider>

    </ThemeProvider>,
    document.getElementById('root'),
)

