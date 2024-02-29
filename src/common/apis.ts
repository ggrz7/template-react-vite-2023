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
				//, autoSignIn: {authFlowType: "CUSTOM_WITH_SRP"},
			},
		});
	} catch (e: any) {
		if ("UsernameExistsException" !== e?.name && "UsernameExistsException" !== e?.["__type"]) {
			console.log(JSON.stringify(e))
		}
	}

	return (await requestMagicLink(email));
}

export const answerCustomChallenge = async (email: string, challengeResponse: string) => {

	try {
		console.log("SIGN_IN ...");
		await authSignIn({username: email, options: {userAttributes: {email}, authFlowType: "CUSTOM_WITHOUT_SRP"}});
		console.log("SIGNED_IN");
	} catch (e) {
		console.log("SIGN_IN FAILED");
		console.error(e);
		return false;
	}

	try {
		console.log("CONFIRM SIGN_IN ...");
		await confirmSignIn({challengeResponse, options: {userAttributes: {email}}});
		console.log("SIGN_IN CONFIRMED");
	} catch (e) {
		console.log("CONFIRM SIGN_IN FAILED");
		console.error(e);
		return false;
	}

	return isAuthenticated()
}

export const fetchUserInfo = () => fetchAuthSession().then(
	async (session: AuthSession) => {
		try {
			return await getUserInfoFromEmail((session?.tokens?.idToken?.payload)?.email, session.tokens?.idToken?.toString());
		} catch (e) {
			console.error(JSON.stringify(e));
			return null;
		}
	}
)

export const createUserInfo = (userInfo: User) => fetchAuthSession()
	.then(data => {
		const jwtToken = data.tokens?.idToken;

		if (!jwtToken) {
			throw new Error();
		}

		return axios.post<User>(
			`https://api.tradingpatterns.net/users`,
			{...userInfo},
			{
				headers: {
					Accept: "application/json",
					Authorization: jwtToken.toString(),
				},
			})
	});
