import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import theme from './theme'
import './index.css'
import CssBaseline from '@material-ui/core/CssBaseline'
import App from './components/App/App'
//import * as serviceWorker from './serviceWorker'

const element = (
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Router>
                <App/>
            </Router>
        </ThemeProvider>
    </React.StrictMode>
)

ReactDOM.render(
    element,
    document.getElementById('root')
)

//serviceWorker.unregister()
