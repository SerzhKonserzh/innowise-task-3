import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router';
import { router } from './components/routes/AppRouter';
import { theme } from './theme';

export default function App() {
	

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<RouterProvider router={router} />
				<CssBaseline />
			</ThemeProvider>
		</Provider>
	);
}
