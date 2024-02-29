import React from 'react'
import ReactDOM from 'react-dom/client'
import {HelmetProvider} from 'react-helmet-async';

import ReduxProvider from "./providers/ReduxProvider";
import ThemeProvider from "./providers/ThemeProvider";
import App from './app'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AuthProvider from "./providers/AuthProvider";

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ReduxProvider>
			<AuthProvider>
				<HelmetProvider>
					<ThemeProvider>
						<App/>
					</ThemeProvider>
				</HelmetProvider>
			</AuthProvider>
		</ReduxProvider>
	</React.StrictMode>,
)
