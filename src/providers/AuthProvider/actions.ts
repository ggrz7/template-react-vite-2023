import * as Types from "./types";
import {User} from "../../common/models.ts";
import {AuthAction} from "./actionTypes.ts";

export const setLoggedInAction = (isLogged: boolean): AuthAction => {
	return {
		type: Types.SET_LOGGED_IN,
		payload: isLogged
	}
}

export const setUserInfoAction = (user?: User) : AuthAction => {
	return {
		type: Types.SET_USER_INFO,
		payload: user,
	}
}
