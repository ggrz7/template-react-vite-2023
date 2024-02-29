import React from "react";
import {Navigate} from 'react-router-dom';
import LayoutPrivate from "../LayoutPrivate";
import PAGES from "../../../../constants/pages.ts";
import {useAuth} from "../../../../providers/AuthProvider";


interface PrivateRouteProps {
	children?: React.ReactNode
}

const PrivateRoute = ({children}: PrivateRouteProps) => {
	const { state } = useAuth()
	const { loggedIn } = state

	if (loggedIn == null) {
		return (<div></div>)
	} else if (!loggedIn) {
		return (<Navigate to={{pathname: PAGES.SIGN_IN.path}}/>);
	}

	return <LayoutPrivate>{ children }</LayoutPrivate>
}

export default PrivateRoute;
