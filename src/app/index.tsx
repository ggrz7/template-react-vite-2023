import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {Helmet} from 'react-helmet-async';

import Home from "./pages/home";

import {useTranslation} from "react-i18next";
import '../locales/i18n.ts';


const App = () => {
	const {i18n} = useTranslation();

	return (
		<>
			<Router>
				<Helmet
					titleTemplate="LemonBulls"
					defaultTitle="LemonBulls"
					htmlAttributes={{lang: i18n.language}}
				>
					<meta name="description" content="Create your trading strategy!"/>
				</Helmet>

				<Routes>
					<Route path="/" Component={Home}/>
					<Route path="*" element={<Navigate replace to="/"/>}/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
