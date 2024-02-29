import React, { useState } from 'react';
import { Card, TextField, Button, CircularProgress, Typography, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Logo from '../../../../assets/logo.png'; // Adjust if necessary
import { MdOutlineAutoAwesome } from "react-icons/md";
// import {signIn} from "../../../../common/apis.ts";
import PAGES from "../../../../constants/pages.ts";
import {useAuth} from "../../../../providers/AuthProvider";

const Login = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const { signIn } = useAuth()

	const onSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const values = {
			email: formData.get('email') as string,
		};

		try {
			setLoading(true);
			const response = await signIn?.(values);
			navigate(PAGES.VERIFY.path || "", { replace: true, state: { email: values.email } });
		} catch (e) {
			console.error(e?.response?.data?.message || e?.message || e); // Use a snackbar or dialog to show error
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
			<Box mb={4}>
				<img src={Logo} alt="Logo" style={{ maxWidth: '90%', maxHeight: '250px' }} />
			</Box>

			<Typography variant="h4" gutterBottom>
				First, enter your email
			</Typography>
			<Typography variant="subtitle1" gutterBottom>
				We suggest using an <strong>email address that you don't forget.</strong>
			</Typography>

			<Box component="form" onSubmit={onSubmit} sx={{ maxWidth: '400px', width: '100%' }}>
				<TextField
					fullWidth
					required
					id="email"
					name="email"
					label="Email"
					type="email"
					margin="normal"
					variant="outlined"
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					disabled={loading}
					sx={{ mt: 3, mb: 2 }}
				>
					{loading ? <CircularProgress size={24} /> : 'Sign in with Email'}
				</Button>
				<Box display="flex" alignItems="center" bgcolor="rgba(253, 162, 253, 0.05)" p={2} borderRadius={2}>
					{/*<MdOutlineAutoAwesome />*/}
					<Typography variant="body2" sx={{ pl: 2 }}>
						We’ll email you a magic code for a password-free sign in.
					</Typography>
				</Box>
			</Box>
		</Box>
	);
}

export default Login;
