import React, { ChangeEvent, useState } from 'react';
import { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { ILoginRequest } from '../../../store/user/userTypes';
import { useLoginUserMutation } from '../../../store/user/userApi';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../store/user/userSlice';
import { Link, useNavigate } from 'react-router';
import { Alert } from '@mui/material';

const Card = styled(MuiCard)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignSelf: 'center',
	width: '100%',
	padding: theme.spacing(4),
	gap: theme.spacing(2),
	margin: 'auto',
	[theme.breakpoints.up('sm')]: {
		maxWidth: '450px'
	},
	boxShadow:
		'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
	...theme.applyStyles('dark', {
		boxShadow:
			'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px'
	})
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
	height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
	minHeight: '100%',
	padding: theme.spacing(2),
	[theme.breakpoints.up('sm')]: {
		padding: theme.spacing(4)
	},
	'&::before': {
		content: '""',
		display: 'block',
		position: 'absolute',
		zIndex: -1,
		inset: 0,
		backgroundImage:
			'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
		backgroundRepeat: 'no-repeat',
		...theme.applyStyles('dark', {
			backgroundImage:
				'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))'
		})
	}
}));

const Auth: FC = (props: { disableCustomTheme?: boolean }) => {
	const [credentials, setCredentials] = useState<ILoginRequest>({
		username: '',
		password: ''
	});
	const [formError, setFormError] = useState<string | null>(null);

	const [login, { isLoading, error }] = useLoginUserMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCredentials(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!credentials.username.trim() || !credentials.password.trim()) {
			setFormError('Please fill in all fields.');
			return;
		}

		setFormError(null);

		try {
			const data = await login(credentials).unwrap();

			// Рассчитываем срок действия (7 дней)
			const expires = new Date(
				Date.now() + 7 * 24 * 60 * 60 * 1000
			).toISOString();

			dispatch(
				loginUser({
					currentUser: {
						id: data.id,
						username: data.username,
						email: data.email,
						firstName: data.firstName,
						lastName: data.lastName,
						gender: data.gender,
						image: data.image
					},
					token: data.accessToken,
					tokenExpires: expires
				})
			);
			navigate('/');
		} catch (err: any) {
			let message = 'Login failed. Please check your credentials.';
			if (err?.data?.message) {
				message = err.data.message; // если бэкенд присылает сообщение
			} else if (err?.status === 401) {
				message = 'Invalid username or password.';
			} else if (err?.status) {
				message = `Error: ${err.status}`;
			}
			setFormError(message);
			console.error('Login failed:', err);
		}
	};

	return (
		<SignInContainer direction="column" justifyContent="space-between">
			<Card variant="outlined">
				<Typography
					component="h1"
					variant="h4"
					sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
				>
					Sign in
				</Typography>

				{formError && (
					<Alert severity="error" sx={{ mb: 2 }}>
						{formError}
					</Alert>
				)}
				{error && !formError && (
					<Alert severity="error" sx={{ mb: 2 }}>
						Network error. Please try again later.
					</Alert>
				)}

				<Stack
					component="form"
					onSubmit={handleSubmit}
					noValidate
					sx={{
						width: '100%',
						gap: 2
					}}
				>
					<FormControl>
						<FormLabel htmlFor="email">Username</FormLabel>
						<TextField
							id="username"
							type="text"
							name="username"
							value={credentials.username}
							onChange={handleChange}
							placeholder="Your username"
							autoFocus
							required
							fullWidth
							variant="outlined"
							color="primary"
							error={!!formError && !credentials.username.trim()}
						/>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="password">Password</FormLabel>
						<TextField
							name="password"
							placeholder="••••••"
							type="password"
							id="password"
							value={credentials.password}
							onChange={handleChange}
							autoComplete="current-password"
							autoFocus
							required
							fullWidth
							variant="outlined"
							color="primary"
							error={!!formError && !credentials.password.trim()}
						/>
					</FormControl>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						disabled={isLoading}
					>
						Sign in
					</Button>
				</Stack>
				<Divider>or</Divider>
				<Stack sx={{ gap: 2 }}>
					<Button type="button" component={Link} to={'/'} disabled={isLoading}>
						Check catalog
					</Button>
				</Stack>
			</Card>
		</SignInContainer>
	);
};

export default Auth;
