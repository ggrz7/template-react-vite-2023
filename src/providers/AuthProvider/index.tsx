import * as React from 'react'
import {Context} from 'react'
import {confirmSignIn, fetchAuthSession, signIn as authSignIn, signOut as authSignOut, signUp} from 'aws-amplify/auth';
import {getUserInfoFromEmail, requestMagicLink} from '../../common/apis.ts'
import {AuthSession} from "@aws-amplify/core/src/singleton/Auth/types";

type UserInfo = {
	username: string
	email: string
	firstName?: string
	lastName?: string
	role?: string
}
type AC = {
	loggedIn: boolean | null
	isAuthenticated: () => Promise<boolean>
	signIn: (args: { email: string }) => Promise<any>
	answerCustomChallenge: (email: string, answer: string) => Promise<boolean>
	signOut: typeof authSignOut,
	userInfo: UserInfo | null
	setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>
}

const AuthContext: Context<AC> = React.createContext<AC>({
	loggedIn: null,
	isAuthenticated: () => Promise.resolve(false),
	signIn: () => Promise.resolve(null),
	answerCustomChallenge: () => Promise.resolve(true),
	signOut: () => Promise.resolve(),
	userInfo: null,
	setUserInfo: () => Promise.resolve()
})

type AuthProviderProps = {
	children: React.ReactNode
}

const AuthProvider = (props: AuthProviderProps) => {
	const [loggedIn, setLoggedIn] = React.useState<AC['loggedIn']>(null)
	const [userInfo, setUserInfo] = React.useState<AC['userInfo']>(null)

	const isAuthenticated = React.useCallback(async () => {
		try {
			console.log("FETCHING AUTH SESSION ...");
			let authSession: AuthSession = await fetchAuthSession();
			console.log("AUTH SESSION FETCHED");

			return authSession?.tokens?.idToken?.payload?.email !== undefined &&
				Date.now() < (authSession?.tokens?.idToken?.payload?.exp || 0) * 1000;
		} catch (error) {
			console.log("AUTH_SESSION FAILED ->" + error)
			return false
		}
	}, []);

	React.useEffect(() => {
		isAuthenticated().then((res) => setLoggedIn(res))
	}, [isAuthenticated])

	React.useEffect(() => {
		if (loggedIn) {
			fetchAuthSession().then(
				(session: AuthSession) => {
					console.log("GETTING USER INFO FROM EMAIL...");
					getUserInfoFromEmail((session?.tokens?.idToken?.payload as any)?.email, session.tokens?.idToken?.toString())
						.then(r => {
							setUserInfo(r)
							console.log("GOT USER INFO FROM EMAIL");
						}).catch(r => {
						console.log("CANNOT GET USER INFO FROM EMAIL");
						console.error(r);
						setUserInfo(null)
					})
				}
			).catch(e => console.error(e))

		} else {
			setUserInfo(null)
		}
	}, [loggedIn])

	const signIn = React.useCallback(async ({email}: { email: string }) => {
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
	}, [])


	const answerCustomChallenge = async (email: string, challengeResponse: string) => {

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

		setLoggedIn(true)
		return isAuthenticated()
	}

	const signOut = React.useCallback(async () => {
		await authSignOut()
		setLoggedIn(false)
	}, [])


	return (
		<AuthContext.Provider value={{
			loggedIn,
			isAuthenticated,
			signIn,
			answerCustomChallenge,
			signOut,
			userInfo,
			setUserInfo
		}}>
			{props.children}
		</AuthContext.Provider>
	)
}

const useAuth = () => React.useContext(AuthContext)

export {AuthProvider, useAuth}
