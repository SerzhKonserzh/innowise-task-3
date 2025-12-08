import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Home from './components/pages/Home';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/Header';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { deepPurple, purple } from '@mui/material/colors';
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
				main: '#5D3A9B' // темно-фиолетовый
			},
			secondary: {
				main: '#8A66C2' // светло-фиолетовый (акцент)
			},
			background: {
				default: '#F9F7FC', // очень светлый лавандовый фон
				paper: '#FFFFFF'
			},
			text: {
				primary: '#2E294E', // тёмно-синий для основного текста
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
