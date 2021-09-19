import ReactDOM from 'react-dom'
import App from './App'
import {createTheme, ThemeProvider} from "@mui/material"
import { zhCN } from 'date-fns/locale';
const theme = createTheme({
    palette: {
        primary: { main: '#1976d2' },
    },
}, zhCN);



ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
  document.getElementById('root')
);

