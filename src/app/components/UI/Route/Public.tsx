import * as React from "react";
import {useAuthState} from "../../../../providers/AuthProvider/hooks";
import {Navigate} from "react-router-dom";
import PAGES from "../../../../constants/pages";

interface PublicRouteProps {
	children?: React.ReactNode
}

const PublicRoute = ({ children }: PublicRouteProps) => {
	const { loggedIn } = useAuthState()


	if (loggedIn == null) {
		return (<div></div>)
	} else if (loggedIn) {
		return (<Navigate to={{pathname: PAGES.HOME.path}}/>);
	}

	return <>{ children }</>;
}
export default PublicRoute;
