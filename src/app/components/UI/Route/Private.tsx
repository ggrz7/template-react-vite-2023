import React from "react";
import {Navigate} from 'react-router-dom';
import LayoutPrivate from "../LayoutPrivate";
import PAGES from "../../../../constants/pages";
import {useAuthState} from "../../../../providers/AuthProvider/hooks";


interface PrivateRouteProps {
	children?: React.ReactNode
}

const PrivateRoute = ({children}: PrivateRouteProps) => {
	const { loggedIn, userInfo } = useAuthState()

	console.log(loggedIn)

	if (loggedIn == null) {
		return (<div></div>)
	} else if (!loggedIn) {
		return (<Navigate to={{pathname: PAGES.SIGN_IN.path}}/>);
	}

	if (userInfo === null) {
		return <LayoutPrivate>loading</LayoutPrivate>
	}

	if (!userInfo?.username) {
		return <LayoutPrivate ></LayoutPrivate>
	}

	return <LayoutPrivate>{ children }</LayoutPrivate>
}

export default PrivateRoute;
