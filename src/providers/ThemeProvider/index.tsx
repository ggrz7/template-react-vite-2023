import React from 'react'
import {ThemeProvider as MUIThemeProvider, createTheme} from "@mui/material";

const theme = createTheme({});

type ThemeProviderProps = {
	children: React.ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => (
	<MUIThemeProvider theme={theme}>
		{children}
	</MUIThemeProvider>
)

export default ThemeProvider


