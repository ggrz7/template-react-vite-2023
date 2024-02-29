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
import {AuthProvider} from "./providers/AuthProvider";
import {Amplify} from "aws-amplify";

Amplify.configure({
	Auth: {
		Cognito: {
			userPoolId: 'eu-central-1_66GXTWiAh',
			userPoolClientId: '550jgaomn5m9e3u982hutl4u20',
			//cookieStorage: { domain: "localhost", path: "/", expires: 5, secure: true,},
			//mandatorySignIn: true,
			//authenticationFlowType: "CUSTOM_AUTH",

			/* oauth: {
					 domain: '<your cognito pool custom domain>',
					 scope: ['email', 'openid', 'profile'],
					 redirectSignIn: 'http://localhost:3000',
					 redirectSignOut: 'http"//localhost:3000',
					 responseType: 'code',
			 },
			 */
		}
	},
})

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
