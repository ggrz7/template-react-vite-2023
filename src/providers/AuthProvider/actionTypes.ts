import * as Types from "./types";
import {User} from "../../common/models.ts";


type ActionMap<M extends { [index: string]: unknown }> = {
	[Key in keyof M]: M[Key] extends undefined
		? {
			type: Key;
		}
		: {
			type: Key;
			payload: M[Key];
		}
};

type AuthActionPayload = {
	[Types.SET_LOGGED_IN]: boolean;
	[Types.SET_USER_INFO]: User;
}

export type AuthAction = ActionMap<AuthActionPayload>[keyof ActionMap<AuthActionPayload>];

export type AuthContextType = {
	loggedIn: boolean | null
	userInfo: UserInfo | null
}
