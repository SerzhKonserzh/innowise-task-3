// components/Header.tsx
import React, { useEffect, useState } from 'react';
import {
	AppBar,
	Toolbar,
	Typography,
	Box,
	useMediaQuery,
	useTheme,
	CircularProgress,
	Button,
	Grid,
	Tooltip,
	IconButton,
	Avatar,
	Menu,
	MenuItem
} from '@mui/material';
import { Autocomplete, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchProductsQuery } from '../store/products/productApi';
import { Link, useNavigate } from 'react-router';
import { IProduct } from '../store/products/productTypes';
import { useDebounce } from '../hooks/useDebounce';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { useSelector } from 'react-redux';
import { TypeRootState } from '../store/store';
import StorefrontIcon from '@mui/icons-material/Storefront';

const Header = () => {
	const navigate = useNavigate();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

	const [info, setInfo] = useState({ username: 'Guest', image: '' });
	const { currentUser, isAuthenticated } = useSelector(
		(state: TypeRootState) => state.user
	);

	const [inputValue, setInputValue] = useState<string>('');
	const [open, setOpen] = useState<boolean>(false);

	const debouncedQuery = useDebounce(inputValue, 300);

	const { data: products = [], isFetching } = useSearchProductsQuery(
		debouncedQuery,
		{
			skip: !debouncedQuery.trim()
		}
	);

	useEffect(() => {
		if (!currentUser) return;
		console.log(currentUser);
		setInfo(currentUser);
	}, [currentUser]);

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleSelect = (_: any, product: IProduct | null) => {
		if (product) {
			navigate(`/product/${product.id}`);
			setInputValue('');
			setOpen(false);
		}
	};

	return (
		<AppBar
			position="sticky"
			sx={{ backgroundColor: 'background.paper', boxShadow: 1 }}
		>
			<Toolbar
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					gap: 2,
					width: '100%'
				}}
			>
				<Button component={Link} to={'/'}>
					{!isMobile ? (
						<Typography variant="h6" color="primary" fontWeight="bold">
							Web Shop
						</Typography>
					) : (
						<IconButton sx={{ p: 0 }}>
							<StorefrontIcon
								sx={{
									color: 'primary.main',
									width: 40,
									height: 'auto'
								}}
							/>
						</IconButton>
					)}
				</Button>

				<Grid sx={{ flexGrow: 0, display: 'flex', gap: '20px' }}>
					<Box>
						<Tooltip title="Open cart">
							<IconButton sx={{ p: 0 }}>
								<LocalGroceryStoreIcon
									sx={{
										color: 'primary.main',
										width: 40,
										height: 'auto'
									}}
								/>
							</IconButton>
						</Tooltip>
					</Box>
					<Box>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar
									alt="Remy Sharp"
									src={info.image}
									sx={{
										color: 'primary.main'
									}}
								/>
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
					<Box sx={{ width: isMobile ? 120 : 300 }}>
						<Autocomplete
							freeSolo
							open={open && inputValue.trim().length > 0}
							onOpen={() => setOpen(true)}
							onClose={() => setOpen(false)}
							options={products}
							getOptionLabel={option =>
								typeof option === 'string' ? option : option.title
							}
							inputValue={inputValue}
							onInputChange={(_, newInputValue, reason) => {
								if (reason === 'reset') {
									setOpen(false);
									setInputValue('');
									return;
								}

								setInputValue(newInputValue);

								if (newInputValue.trim().length > 0) {
									setOpen(true);
								} else {
									setOpen(false);
								}
							}}
							onChange={handleSelect}
							filterOptions={x => x}
							renderInput={params => (
								<TextField
									{...params}
									placeholder="Поиск товаров..."
									InputProps={{
										...params.InputProps,
										startAdornment: (
											<SearchIcon
												fontSize="small"
												sx={{ mr: 1, color: 'primary.main' }}
											/>
										),
										endAdornment: (
											<>
												{isFetching ? (
													<CircularProgress color="inherit" size={20} />
												) : null}
												{params.InputProps.endAdornment}
											</>
										),
										sx: {
											backgroundColor: 'background.default',
											borderRadius: 2
										}
									}}
									variant="outlined"
									size="small"
								/>
							)}
							renderOption={(props, option) => (
								<li {...props} key={option.id}>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											gap: 1.5,
											py: 1,
											width: '100%'
										}}
									>
										<Box
											component="img"
											src={option.thumbnail}
											alt={option.title}
											sx={{
												width: 40,
												height: 40,
												objectFit: 'contain',
												borderRadius: 1,
												border: '1px solid',
												borderColor: 'divider'
											}}
										/>
										<Box>
											<Typography variant="body2" fontWeight="500" noWrap>
												{option.title}
											</Typography>
											<Typography variant="caption" color="text.secondary">
												${option.price}
											</Typography>
										</Box>
									</Box>
								</li>
							)}
							sx={{
								width: '100%',
								'& .MuiAutocomplete-popper': {
									backgroundColor: 'background.paper',
									border: '1px solid',
									borderColor: 'divider',
									borderRadius: 1,
									mt: 0.5,
									zIndex: theme.zIndex.modal
								}
							}}
						/>
					</Box>
				</Grid>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
