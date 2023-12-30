import {BrowserRouter as Router, Link, Routes, Route} from "react-router-dom";
import Home from "./pages/home";

import CssBaseline from '@mui/material/CssBaseline';

const  Index = () => {
	return (
		<>
			<CssBaseline/>
			<Router>
				<div>
					<nav>
						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
						</ul>
					</nav>

					<Routes>
						<Route path="/" Component={Home}/>
					</Routes>
				</div>
			</Router>
		</>
	);
}

export default Index;
