import React from "react";
import Home from "../app/pages/home";
import SignIn from "../app/pages/auth/login";
import VerifyMagicLink from "../app/pages/auth/verifyMagicLink";


export interface Route {
	path?: string,
	component: React.ComponentType,
	private?: boolean,
}

type RouteName = 'HOME'
	| 'SIGN_IN'
	| 'VERIFY'

const PAGES: Record<RouteName, Route> = {
	HOME: {
		component: Home,
		path: "/",
		private: true,
	},
	VERIFY: {
		component: VerifyMagicLink,
		path: "/verify",
	},
	SIGN_IN: {
		component: SignIn,
		path: "/signIn",
	},
}

export default PAGES
