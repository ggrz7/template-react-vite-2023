import React from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider as MUIThemeProvider, createTheme} from "@mui/material";


const theme = createTheme({
	palette: {
		mode: 'dark',
	}
});

type ThemeProviderProps = {
	children: React.ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => (
	<MUIThemeProvider theme={theme}>
		<CssBaseline/>
		{children}
	</MUIThemeProvider>
)

export default ThemeProvider


