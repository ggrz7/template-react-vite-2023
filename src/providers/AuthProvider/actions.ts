import * as Types from "./types";
import {User} from "../../common/models.ts";
import {AuthAction} from "./actionTypes.ts";

export const loginAction = (): AuthAction => {
	return {
		type: Types.LOGIN
	}
}

export const logoutAction = (): AuthAction => {
	return {
		type: Types.LOGOUT
	}
}

export const setUserInfoAction = (user: User) : AuthAction => {
	return {
		type: Types.SET_USER_INFO,
		payload: user,
	}
}
