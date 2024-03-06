import * as Types from "./types";
import {AuthAction, AuthContextType} from "./actionTypes.ts";

export const initState: AuthContextType = {
	loggedIn: null,
	userInfo: null,
}

export const authReducer = (state: AuthContextType, action: AuthAction) => {
	const { type} = action

	switch (type) {
		case Types.SET_LOGGED_IN:
			return {
				...state,
				loggedIn: action.payload
			}
		case Types.SET_USER_INFO:
			return {
				...state,
				userInfo: action.payload
			}
		default:
			return state
	}

}
