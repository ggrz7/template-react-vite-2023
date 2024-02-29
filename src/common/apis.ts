import axios from "axios";
import {User} from "./models.ts";

export const requestMagicLink = (email: string) => axios.post(
	`https://api.tradingpatterns.net/register`, //TODO
	{email}
)
	.then(({ data }) => data)
	.catch((e) => console.log(JSON.stringify(e)))

export const getUserInfoFromEmail = (email?: string | number | null | boolean | undefined, token?: string | undefined) => axios.get<User>(
	`https://api.tradingpatterns.net/users/${email}?fromEmail=true`,
	{
		headers: {
			Accept: "application/json",
			Authorization: token,
		},
	}
)
	.then(({ data }) => data)
	.catch((e) => console.log(JSON.stringify(e)))
