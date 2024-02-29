import * as React from "react";
import {useAuth} from "../../../../providers/AuthProvider";
import {Navigate} from "react-router-dom";
import PAGES from "../../../../constants/pages.ts";

interface PublicRouteProps {
	children?: React.ReactNode
}

const PublicRoute = ({ children }: PublicRouteProps) => {
	const { loggedIn } = useAuth()

	if (loggedIn == null) {
		return (<div></div>)
	} else if (loggedIn) {
		return (<Navigate to={{pathname: PAGES.HOME.path}}/>);
	}

	return <>{ children }</>;
}
export default PublicRoute;
