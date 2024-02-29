import { signOut } from "aws-amplify/auth";
import * as Types from "./types";
import {AuthAction, AuthContextType} from "./actionTypes.ts";
import {answerCustomChallenge, isAuthenticated, signIn} from "../../common/apis.ts";

export const initState = (): AuthContextType => ({
	loggedIn: null,
	isAuthenticated,
	signIn: signIn,
	answerCustomChallenge: answerCustomChallenge,
	signOut: signOut,
	userInfo: null,
})

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
