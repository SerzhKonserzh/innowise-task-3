// src/components/Header.tsx
import React from 'react';
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Container,
	Grid
} from '@mui/material';
import MainAppBar from './MainAppBar';

const Header: React.FC = () => {
	return (
		<Grid container sx={{bgcolor: "#1f0023"}}>
			<Container>
        <MainAppBar />
			</Container>
		</Grid>
	);
};

export default Header;
