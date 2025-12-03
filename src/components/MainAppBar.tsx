import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { Avatar, Grid } from '@mui/material';
import { Link } from 'react-router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TypeRootState } from '../store/store';

const pages = ['Catalog'];

function MainAppBar() {
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

	const [info, setInfo] = useState({ username: 'Guest', image: '' });
	const { currentUser, isAuthenticated } = useSelector((state: TypeRootState) => state.user);

	useEffect(() => {
		if (!currentUser) return;
		console.log(currentUser);
		setInfo(currentUser);
	}, [currentUser]);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="static" sx={{ bgcolor: 'inherit', boxShadow: 'none' }}>
			<Toolbar disableGutters>
				<Button component={Link} to={`/`}>
					<StorefrontIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
					<Typography
						variant="h6"
						noWrap
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none'
						}}
					>
						Web Store
					</Typography>
				</Button>
				<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
					<IconButton
						size="large"
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={handleOpenNavMenu}
						color="inherit"
					>
						<MenuIcon />
					</IconButton>
					<Menu
						id="menu-appbar"
						anchorEl={anchorElNav}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left'
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'left'
						}}
						open={Boolean(anchorElNav)}
						onClose={handleCloseNavMenu}
						sx={{ display: { xs: 'block', md: 'none' } }}
					>
						{pages.map(page => (
							<MenuItem key={page} onClick={handleCloseNavMenu}>
								<Typography sx={{ textAlign: 'center' }}>{page}</Typography>
							</MenuItem>
						))}
					</Menu>
				</Box>
				<StorefrontIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
				<Typography
					variant="h5"
					noWrap
					sx={{
						mr: 2,
						display: { xs: 'flex', md: 'none' },
						flexGrow: 1,
						fontFamily: 'monospace',
						fontWeight: 700,
						letterSpacing: '.3rem',
						color: 'inherit',
						textDecoration: 'none'
					}}
				>
					Web Store
				</Typography>
				<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
					{pages.map(page => (
						<Button
							key={page}
							onClick={handleCloseNavMenu}
							sx={{ my: 2, color: 'white', display: 'block' }}
						>
							{page}
						</Button>
					))}
				</Box>
				<Grid sx={{ flexGrow: 0, display: 'flex', gap: '20px' }}>
					<Box>
						<Tooltip title="Open cart">
							<IconButton sx={{ p: 0 }}>
								<LocalGroceryStoreIcon
									sx={{
										color: 'white',
										width: { md: '40px', xs: '30px' },
										height: 'auto'
									}}
								/>
							</IconButton>
						</Tooltip>
					</Box>
					<Box>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt="Remy Sharp" src={info.image} />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{isAuthenticated ? (
								<MenuItem
									onClick={handleCloseUserMenu}
									component={Link}
									to={'/login'}
								>
									<Typography sx={{ textAlign: 'center' }}>Logout</Typography>
								</MenuItem>
							) : (
								<MenuItem
									onClick={handleCloseUserMenu}
									component={Link}
									to={'/login'}
								>
									<Typography sx={{ textAlign: 'center' }}>Login</Typography>
								</MenuItem>
							)}
						</Menu>
					</Box>
				</Grid>
			</Toolbar>
		</AppBar>
	);
}
export default MainAppBar;
