import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router';
import { router } from './components/routes/AppRouter';

declare module '@mui/material/Button' {
	interface ButtonPropsVariantOverrides {
		category: true;
	}
}

export default function App() {
	const theme = createTheme({
		palette: {
			primary: {
				main: '#5D3A9B'
			},
			secondary: {
				main: '#8A66C2'
			},
			background: {
				default: '#F9F7FC',
				paper: '#FFFFFF'
			},
			text: {
				primary: '#2E294E',
				secondary: '#5D5D5D'
			}
		},
		typography: {
			h1: { fontSize: '2.5rem', fontWeight: 700 },
			h2: { fontSize: '2rem', fontWeight: 600 },
			body1: { fontSize: '1rem' }
		},
		breakpoints: {
			values: {
				xs: 400,
				sm: 600,
				md: 900,
				lg: 1200,
				xl: 1536
			}
		}
	});

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<RouterProvider router={router} />
				<CssBaseline />
			</ThemeProvider>
		</Provider>
	);
}
