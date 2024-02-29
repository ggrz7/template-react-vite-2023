import React, {createContext, useEffect, useMemo, useReducer} from "react";
import {Amplify} from 'aws-amplify';
import config from './config'
import {authReducer, getInitialState} from "./reducer.ts";

Amplify.configure(config)


type AuthProviderProps = {
	children: React.ReactNode
}

export const AuthContext = createContext({})
const AuthProvider = ({children}: AuthProviderProps) => {
	const initialState = getInitialState()

	const [state, dispatch] = useReducer(authReducer, initialState)

	const value = useMemo(() => ({state, dispatch}), [state, dispatch])

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => React.useContext(AuthContext)
export default AuthProvider
