import { BrowserRouter, useLocation } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from './styles/theme'
import { GlobalStyle } from './styles/globalStyle'
import ThemeRoutes from './routes'
import { ThemeProviderWithState, useThemeMode } from './contexts/ThemeContext'
import { memo } from 'react'
import { AdminGlobalStyle } from './styles/adminGlobalStyle'

function ThemeWrapperComponent() {
    const { themeMode } = useThemeMode();
    const location = useLocation();

    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
            {isAdminRoute ? <AdminGlobalStyle /> : <GlobalStyle />}
            <ThemeRoutes />
        </ThemeProvider >
    )
}

const ThemeWrapper = memo(() => {
    return (
        <BrowserRouter>
            <ThemeWrapperComponent />
        </BrowserRouter>
    )
});

function App() {

    return (
        <ThemeProviderWithState>
            <ThemeWrapper />
        </ThemeProviderWithState>
    )
}

export default App;
