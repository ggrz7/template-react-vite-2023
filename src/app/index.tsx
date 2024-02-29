import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {Helmet} from 'react-helmet-async';
import {useTranslation} from "react-i18next";

import { PrivateRoute, PublicRoute } from "./components";
import PAGES from "../constants/pages.ts";

import '../locales/i18n.ts';


const App = () => {
	const {i18n} = useTranslation();

	const routes = Object.values(PAGES).map((p) => {
		const Component = p.component

		if (p.private) {
			return (<Route key={p.path} path={p.path} element={<PrivateRoute><Component/></PrivateRoute>}/>);
		} else {
			return (<Route key={p.path} path={p.path} element={<PublicRoute><Component/></PublicRoute>}/>);
		}
	});

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
					{routes}
					<Route path="*" element={<Navigate replace to="/"/>}/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
