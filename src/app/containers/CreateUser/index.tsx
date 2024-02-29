import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';
import { getCurrentUser } from "aws-amplify/auth";
import {useAuth} from "../../../providers/AuthProvider";
import {createUserInfo} from "../../../common/apis.ts";
import {setUserInfoAction} from "../../../providers/AuthProvider/actions.ts";

export function UserPage() {
	const { dispatch } = useAuth()

	const onFinish = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const values = {
			username: formData.get('username') as string,
			firstName: formData.get('firstName') as string,
			lastName: formData.get('lastName') as string,
		};

		getCurrentUser().then((user) => {
			const userInfo = { ...values, email: user.username };
			createUserInfo(userInfo).then(() => dispatch?.(setUserInfoAction(userInfo)));
		}).catch((e) => console.error(e));
	};

	return (
		<>
			<Helmet>
				<title>User Page</title>
				<meta name="description" content="User Page"/>
			</Helmet>

			<Container maxWidth="sm">
				<Typography variant="h4" gutterBottom>User Details</Typography>
				<form onSubmit={onFinish} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								required
								id="username"
								name="username"
								label="Username"
								fullWidth
								autoComplete="username"
								variant="outlined"
								placeholder="Username"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="firstName"
								name="firstName"
								label="First Name"
								fullWidth
								autoComplete="given-name"
								variant="outlined"
								placeholder="First name"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="lastName"
								name="lastName"
								label="Last Name"
								fullWidth
								autoComplete="family-name"
								variant="outlined"
								placeholder="Last Name"
							/>
						</Grid>
						<Grid item xs={12}>
							<Button type="submit" variant="contained" color="primary">
								Submit
							</Button>
						</Grid>
					</Grid>
				</form>
			</Container>
		</>
	);
}
