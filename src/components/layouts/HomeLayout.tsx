import { FC } from 'react';
import React from 'react';
import Header from '../Header';
import { Outlet } from 'react-router';
import { Grid } from '@mui/material';

const HomeLayout: FC = () => {
	return (
		<Grid>
			<Header />
			<main>
				<Outlet />
			</main>
		</Grid>
	);
};

export default HomeLayout;
