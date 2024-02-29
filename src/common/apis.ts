import axios from "axios";
import {User} from "./models.ts";
import {confirmSignIn, fetchAuthSession, signIn as authSignIn, signUp} from "aws-amplify/auth";
// @ts-expect-error TBD
import {AuthSession} from '@aws-amplify/core/dist/esm/singleton/Auth/types';

export const requestMagicLink = (email: string) => axios.post(
	`https://api.tradingpatterns.net/register`, //TODO
	{email}
)
	.then(({data}) => data)
	.catch((e) => console.error(JSON.stringify(e)))

export const getUserInfoFromEmail = (email?: string | number | null | boolean | undefined, token?: string | undefined) => axios.get<User>(
	`https://api.tradingpatterns.net/users/${email}?fromEmail=true`,
	{
		headers: {
			Accept: "application/json",
			Authorization: token,
		},
	}
)
	.then(({data}) => data)
	.catch((e) => console.error(JSON.stringify(e)))

export const isAuthenticated = () => fetchAuthSession()
	.then(({tokens}: AuthSession) => tokens?.idToken?.payload?.email !== undefined && Date.now() < (tokens?.idToken?.payload?.exp || 0) * 1000)
	.catch((e) => {
		console.error(JSON.stringify(e))
		return false
	})

export const signIn = async ({email}: { email: string }) => {
	try {
		await signUp({
			username: email,
			password: `password${Math.random().toString().slice(0, 8)}`,
			options: {
				userAttributes: {email}
			},
		});
		return await requestMagicLink(email);
	} catch (e) {
		return console.error(JSON.stringify(e));
	}
}

export const answerCustomChallenge = async (email: string, challengeResponse: string) => {
	try {
		await authSignIn({
			username: email,
			options: {userAttributes: {email}, authFlowType: "CUSTOM_WITHOUT_SRP"}
		});
		try {
			await confirmSignIn({
				challengeResponse,
				options: {userAttributes: {email}}
			});
			return true;
		} catch {
			return false;
		}
	} catch {
		return false;
	}
}

export const fetchUserInfo = () => fetchAuthSession().then(
	(session: AuthSession) => {
		getUserInfoFromEmail((session?.tokens?.idToken?.payload)?.email, session.tokens?.idToken?.toString())
			.then(user => user)
			.catch((e) => {
				console.error(JSON.stringify(e));
				return null
			})
	}
)
