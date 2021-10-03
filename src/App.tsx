import {store} from "./core/store/store"
import {Provider} from "react-redux"
import {CssBaseline} from "@mui/material"
import {StyledEngineProvider} from '@mui/material/styles'
import Routes from "./core/routes"
import PaperContainer from "./components/PaperContainer"

export default function App() {
    return (
        <StyledEngineProvider injectFirst>
            <Provider store={store}>
                <CssBaseline/>
                <PaperContainer>
                    <Routes/>
                </PaperContainer>
            </Provider>
        </StyledEngineProvider>
    )
}
