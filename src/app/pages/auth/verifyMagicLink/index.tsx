import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import Logo from "../../../../assets/logo.png"; // Adjust if necessary
import VerificationInput from 'react-verification-input';
// import {answerCustomChallenge} from "../../../../common/apis.ts";
import PAGES from "../../../../constants/pages.ts";
import {useAuth} from "../../../../providers/AuthProvider";
import {setLoggedInAction} from "../../../../providers/AuthProvider/actions.ts"; // Assuming you have a similar MUI compatible component

const VERIFICATION_CODE_LENGTH = 6;

const VerifyMagicLink = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const {answerCustomChallenge} = useAuth()

	const email = location.state?.email;

	if (!email) {
		navigate(PAGES.SIGN_IN.path || "/", { replace: true });
	}

	const onChange = async (code) => {
		if (code.length === VERIFICATION_CODE_LENGTH) {
			setLoading(true);
			try {
				const res = await answerCustomChallenge(email, code);
				console.log(res);
				navigate(PAGES.HOME.path || "/", { replace: true });
			} catch (e) {
				console.error(e);
				// Display error using MUI Snackbar instead of `message.error`
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
			<Box mb={4}>
				<img src={Logo} alt="Logo" style={{ maxWidth: '90%', maxHeight: '250px' }} />
			</Box>

			<Typography variant="h4" gutterBottom>
				Check your email for a code
			</Typography>
			<Typography variant="subtitle1">
				We’ve sent a 6-character code to <strong>{email}</strong>. The code expires shortly, so please enter it soon.
			</Typography>

			<VerificationInput
				autoFocus
				validChars="0-9"
				length={VERIFICATION_CODE_LENGTH}
				onChange={onChange}
				// Adjust styling and props as needed
			/>

			{loading && (
				<Box display="flex" alignItems="center" mt={2}>
					<CircularProgress size={24} />
					<Typography variant="body2" sx={{ ml: 2 }}>
						Checking your code...
					</Typography>
				</Box>
			)}
		</Box>
	);
};

export default VerifyMagicLink;
