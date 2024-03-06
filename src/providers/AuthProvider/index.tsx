import React, {createContext, useEffect, useMemo, useReducer} from "react";
import {Amplify} from 'aws-amplify';
import config from './config'
import {authReducer, initState} from "./reducer.ts";
import {setLoggedInAction, setUserInfoAction} from "./actions.ts";
import {AuthAction, AuthContextType} from "./actionTypes.ts";
import {fetchUserInfo, isAuthenticated} from "../../common/apis.ts";

Amplify.configure(config)

// Define the shape of your context including state and dispatch
interface IAuthContext {
	state: AuthContextType;
	dispatch: React.Dispatch<AuthAction>;
}

// Provide a default value matching the shape of IAuthContext
const defaultContextValue: IAuthContext = {
	state: initState, // Assuming initState() returns a valid initial state
	dispatch: () => null, // Placeholder function
};

export const AuthContext = createContext<IAuthContext>(defaultContextValue);

type AuthProviderProps = {
	children: React.ReactNode
}
const AuthProvider = ({children}: AuthProviderProps) => {
	const [state, dispatch] = useReducer(authReducer, initState)

	useEffect(() => {
		isAuthenticated().then((authenticated) => dispatch(setLoggedInAction(authenticated)))
	}, [])

	useEffect(() => {
		if(state.loggedIn)
			fetchUserInfo().then((user) => {
				if (user) dispatch(setUserInfoAction(user))
			})
	}, [state.loggedIn]);

	const contextValue = useMemo(() => ({ state, dispatch }), [state]);

	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
