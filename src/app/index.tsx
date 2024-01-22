import {BrowserRouter as Router, Link, Navigate, Route, Routes} from "react-router-dom";

import '../locales/i18n.ts';
import Home from "./pages/home";
import CssBaseline from '@mui/material/CssBaseline';

const App = () => {

	return (
		<>
			<CssBaseline/>
			<Router>
				<div>
					<nav>
						<ul>
							<li>
								<Link to="/login">Home</Link>
							</li>
						</ul>
					</nav>

					<Routes>
						<Route path="/login" Component={Home}/>
						<Route path="/ciao" Component={Home}/>
						<Route path="*" element={<Navigate replace to="/home" />}/>
					</Routes>
				</div>
			</Router>
		</>
	);
}

export default App;
