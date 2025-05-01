import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from './styles/theme'
import { GlobalStyle } from './styles/globalStyle'
import ThemeRoutes from './routes'
import { ThemeProviderWithState, useThemeMode } from './contexts/ThemeContext'
import { memo } from 'react'

function ThemeWrapperComponent() {
    const { themeMode } = useThemeMode();

    return (
        <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
            <GlobalStyle />
            <BrowserRouter>
                <ThemeRoutes />
            </BrowserRouter>
        </ThemeProvider>
    )
}

const ThemeWrapper = memo(ThemeWrapperComponent);

function App() {

    return (
        <ThemeProviderWithState>
            <ThemeWrapper />
        </ThemeProviderWithState>
    )
}

export default App
