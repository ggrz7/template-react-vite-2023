
declare type UserInfo = {
	username: string
	email: string
	firstName?: string
	lastName?: string
	role?: string
}

interface Error {
	message: string;
	response?: { data?: { message: string } }
}

interface SignInErrorConstructor {
	new(message?: string): Error;
	new(response?: { data?: { message: string } }): Error;
	(message?: string): Error;
	(response?: { data?: { message: string } }): Error;
	readonly prototype: Error;
}

declare const SignInError: SignInErrorConstructor;
