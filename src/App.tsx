import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Home from './components/pages/home/Home';
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
			primary: deepPurple,
			secondary: purple
		}
		// components: {
		// 	MuiButton: {
		// 		styleOverrides: {
		// 			root: {
		// 				variants: [
		// 					{
		// 						props: { variant: 'category' },
		// 						style: {
		// 							backgroundColor: 'transparent',
		//               borderColor:'red',
		//               color: 'red'
		// 						}
		// 					}
		// 				]
		// 			}
		// 		}
		// 	},
		//   MuiButtonGroup: {
		// 		styleOverrides: {
		// 			root: {
		// 				variants: [
		// 					{
		// 						props: { variant: 'contained' },
		// 						style: {
		// 							boxShadow: 'none',
		//               border:'solid 1px red',
		// 						}
		// 					}
		// 				]
		// 			}
		// 		}
		// 	}
		// }
	});

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<RouterProvider router={router}/>
				<CssBaseline />
			</ThemeProvider>
		</Provider>
	);
}
